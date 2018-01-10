//Bo Peng
//OS LAB #1
//2-PASS LINKER

import java.io.*;
import java.util.*;
import java.util.regex.Pattern;

public class linker {

    private static Scanner user = new Scanner(System.in);
    //modules List to count how many modules are there
    public static List<Module> modules = new ArrayList<>();
    public static List<String> symErrors = new ArrayList<>();
    public static String[] errors;

    //Module class to store the number of DEF USE and ADDRESSES in each Module
	public static class Module {
        
        private int addressNum;
        private int defNum;
        private int useNum;

        private List<Integer> addresses = new ArrayList<>();
        private Map<String, Integer> definitions = new HashMap<>();
        private Map<String, Integer> uses = new HashMap<>();

		public Module(int defNum, int useNum, int addressNum) {
            this.defNum = defNum;
            this.useNum = useNum;
            this.addressNum = addressNum;
		}

		public int getDefNum() {
			return this.defNum;
		}

		public int getUseNum() {
			return this.useNum;
		}

		public int getAddressNum() {
			return this.addressNum;
		}

        public List<Integer> getAddresses() {
            return addresses;
        }

        public Map<String, Integer> getDefinitions() {
            return definitions;
        }

        public Map<String, Integer> getUses() {
            return uses;
        }

        public void addDefinition(String symbol, int value) {
            definitions.put(symbol, value);
        }

        public void addUse(String symbol, int index) {
            uses.put(symbol, index);
        }

        public void addAddress(int address) {
            addresses.add(address);
        }
	}

    //function to get the information after scanning files
    private static void getModules(String[] inputs) {
        int modCount = Integer.parseInt(inputs[0]);

        int i = 1;
        while (i < (inputs.length)) {
            int defIndex = i;
            int defNum = Integer.parseInt(inputs[defIndex]);

            int useIndex = defIndex + (2 * defNum) + 1;
            int useNum = Integer.parseInt(inputs[useIndex]);

            int addressIndex = useIndex + (2 * useNum) + 1;
            int addressNum = Integer.parseInt(inputs[addressIndex]);

            int indexSkip = (2 * defNum) + (2 * useNum) + addressNum + 3;

            Module mod = new Module(defNum, useNum, addressNum);

            for (int j=0; j < defNum; j++) {
            	int counter = 0;
                String symbol = inputs[defIndex + ((2 * j)+1)];
                int value = Integer.parseInt(inputs[defIndex + ((2 * j)+2)]);

                for(int k = 0; k < modules.size(); k++) {
			        if(modules.get(k).definitions.containsKey(symbol) == true)
			            counter++;  
                }
                //error for if a symbol is multiply defined
                if(counter < 1)
                	mod.addDefinition(symbol, value);
                else
                	symErrors.add("Error: "+symbol+" is multiply defined; first value used.");
            }

            for (int j=0; j < useNum; j++) {
                String symbol = inputs[useIndex + ((2 * j)+1)];
                int index = Integer.parseInt(inputs[useIndex + ((2 * j) + 2)]);
                mod.addUse(symbol, index);
            }

            for (int j=1; j < addressNum + 1; j++) {
                mod.addAddress(Integer.parseInt(inputs[addressIndex + j]));
            }

            //error testing for if an address appearing in a definition exceeds the size of the module
            if(mod.definitions.isEmpty() == false) {
                for (String def: mod.definitions.keySet()){
                    String key = def.toString();
                    int value = mod.definitions.get(def);
                    if (value+1 > addressNum){
                        mod.definitions.put(key, 0);
                        symErrors.add("Error: The definition of "+key+" is outside module "+modules.size()+"; zero (relative) used.");
                    }
                }
            }

            modules.add(mod);
            i = indexSkip + i;
        }
    }

    //method to get the value for each symbol
    private static Map<String, Integer> getFinalSymbolVals(List<Module> modules, List<Integer> modBases) {
        Map<String, Integer> finalSymbolVals = new TreeMap<>();

        for (int i = 0; i < modules.size(); i++) {
            Module mod = modules.get(i);
            if (mod.getDefNum() > 0) {
                Map<String, Integer> modDefinitions = mod.getDefinitions();
                for (String key : mod.getDefinitions().keySet()) {
                    int keyValue = mod.getDefinitions().get(key) + modBases.get(i);
                    modDefinitions.put(key, keyValue);
                }
                finalSymbolVals.putAll(modDefinitions);
            }
        }
        return finalSymbolVals;
    }

    //method to get the modbases for each module
    private static List<Integer> getModBases(List<Module> modules) {
        List<Integer> modBases = new ArrayList<>();
        int baseCount = 0;

        for (Module mod : modules) {
            modBases.add(baseCount);
            baseCount += mod.getAddressNum();
        }

        return modBases;
    }

    //final pass to print all the correct values for memory map
    private static void finalPass(Map<String, Integer> symbolVals, List<Integer> modBases, List<Module> modules, String[] errors) {
    	int memCount = 0;
        int addressSize = 0;

        for(int i = 0; i < modules.size(); i++) {
            for(int j = 0; j < modules.get(i).addresses.size();j++) {
                addressSize++;
            }            
        }

        errors = new String[addressSize];

        for(int i = 0; i < errors.length; i++) {
            errors[i]="";
        }

        //if 5th digit is 4, (external)
        changeExternal(symbolVals, modBases, modules, errors);

        //here takes care of the other numbers (immediate, absolute, relative)
        for(int i = 0; i < modules.size(); i++) {
            for(int j = 0; j < modules.get(i).addresses.size();j++) {
            	int num = modules.get(i).addresses.get(j);
                if(num/10 > 999){
                    if((num)%10 == 1 || (num)%10 == 2)
                        modules.get(i).addresses.set(j,(num/10));
                   	if((num)%10 == 3) {
                   		int base = modBases.get(i);
                   		modules.get(i).addresses.set(j,((num/10) + base));
                   	}
                }
            }
        }

        System.out.println();

        //printing the memory map
        System.out.println("Memory Map");
        for(int i = 0; i < modules.size(); i++) {
            for(int j = 0; j < modules.get(i).addresses.size();j++) {
            	int num = modules.get(i).addresses.get(j);
            	String newVal = String.format("%-3s %d  %s", memCount+":", num, errors[memCount]);
            	System.out.println(newVal);
            	memCount++;
            }
        }
        System.out.println();
        printWarning(symbolVals, modBases, modules);
    }

    //changing the middle 3 digits to the symbol value using while loop to reach 777
    private static void changeExternal(Map<String, Integer> symbolVals, List<Integer> modBases, List<Module> modules, String[] errors) {
        int modNumber = 0;
    	for(int i = 0; i < modules.size();i++) {
	        for (String use: modules.get(i).uses.keySet()){
	            String key = use.toString(); //symbol
                if(i >= 1)
                    modNumber += modules.get(i-1).addresses.size();
	            if(symbolVals.containsKey(key)) {
		            int symVal = symbolVals.get(key); //the val that needs to be added
		            int value = modules.get(i).uses.get(use); //index that needs to be changed	 
		            //error testing for immediate address
		            while(value != 777) {	 
		            	int mem = modules.get(i).addresses.get(value); //the address of the index
		            	int middle = (mem/10)%1000; //middle 3 digits           	
			            int newVal = ((mem/10) - middle) + symVal;
			            modules.get(i).addresses.set(value, newVal);
                        if(mem%10 != 4)
                            errors[value+modNumber]="Error: Immediate address on use list; treated as External.";                        
			            value = middle;
		            }
	        	}
	        	else {
		            int symVal = 0; //the val that needs to be added
		            int value = modules.get(i).uses.get(use); //index that needs to be changed	 
		            //error testing for not defined symbols
		            while(value != 777) {	 
		            	int mem = modules.get(i).addresses.get(value); //the address of the index
		            	int middle = (mem/10)%1000; //middle 3 digits           	
			            int newVal = ((mem/10) - middle) + symVal;
			            modules.get(i).addresses.set(value, newVal);
			            errors[value]="Error: "+key+" is not defined; zero used.";
			            value = middle;
		            }
	        	}
	        }
    	}
    	for(int i = 0; i < modules.size(); i++) {
            for(int j = 0; j < modules.get(i).addresses.size();j++) {
            	int num = modules.get(i).addresses.get(j);
            	if((num/10000) >= 1) {
	               	if((num)%10 == 4) {
               			int base = modBases.get(i);
                        //error testing for E type address not on use chain
               			modules.get(i).addresses.set(j,((num/10) + base));
               			errors[j]="Error: E type address not on use chain; treated as I type.";
	               	}
                }
            }
        }
    }
    //error testing for defined symbols but never used
    private static void printWarning(Map<String, Integer> symbolVals, List<Integer> modBases, List<Module> modules) {
    	int count = 0;
        int chk = 0;

        for (String def: symbolVals.keySet()){
        	int modNum = 0;
            String key = def.toString(); //symbol
            for(int i = 0; i < modules.size();i++) {
            	if(modules.get(i).uses.containsKey(key) == true)
            		count++;
            }
            for(int i = 0; i < modules.size();i++) {
            	if(modules.get(i).definitions.containsKey(key) == true) {
            		modNum = i;
            		i = modules.size();
            	}            	
            }
            if(count == 0) {
                chk++;
            	System.out.println("Warning: "+key+" was defined in module "+modNum+" but never used.");
            }
            count = 0;
        }	
        if(chk > 0)
            System.out.println();
    }

    //MAIN HERE
	public static void main(String[] args) throws FileNotFoundException {

        boolean runFile = true;
        int validFile=0;
        //runs till user presses q to quit
        while(runFile) {
            validFile=0;
            modules.clear();
            symErrors.clear();
            System.out.println("Enter an input file (eg: input1.txt) or q to quit:");
            String fileName = user.nextLine();
            if(fileName.equalsIgnoreCase("q")) {
                System.exit(0);        
            }
            System.out.println();
    		String delims = ("\\s+"); //delim to put all elements in a string array
    		String output = "";       //because some files are not in proper format
    		try {
                BufferedReader in = new BufferedReader(new FileReader(fileName));
                String line;     
    			while ((line = in.readLine()) != null) {
    				output += line.trim() + "\n";
    			}
    		}
    		catch(IOException e) {
                validFile++;
    			System.out.println("Invalid file.\n"); //invalid file
    		}
            //skip this step if invalid file
            if(validFile == 0){   		
        		String[] inputs = output.split(delims);

                getModules(inputs);

                List<Integer> modBases = getModBases(modules);
                Map<String, Integer> finalSymbolVals = getFinalSymbolVals(modules, modBases);

                int symErrorCount = 0;
                //print the symbol table before the memory map
                Collections.sort(symErrors);
                System.out.println("Symbol Table");
                for (String sym: finalSymbolVals.keySet()){
                    String key = sym.toString();
                    String value = finalSymbolVals.get(sym).toString(); 
                    if(symErrors.isEmpty() == false && symErrorCount < symErrors.size()) {
                        System.out.println(key + " = " + value + " " + symErrors.get(symErrorCount)); 
                        symErrorCount++; 
                    }
                    else
                        System.out.println(key + " = " + value);
                } 
                //final pass method used here
                finalPass(finalSymbolVals, modBases, modules, errors);
            }
        }
	}
}
