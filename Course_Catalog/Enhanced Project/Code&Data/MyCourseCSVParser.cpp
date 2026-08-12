#include "MyCourseCSVParser.h"

//Default Constructor
MyCourseCSVParser::MyCourseCSVParser(){}

//Destructor 
MyCourseCSVParser::~MyCourseCSVParser(){}

Course MyCourseCSVParser::CreateCourseFromCSVLine(string csvLine) {
	Course course; //Course Obj to populate
	string line_copy = csvLine; //Copy of CSVLine

	int comma_count = 0;
	int previous_index = 0;
	int counter = 0;

	//Populate then create course object with overload constructor
	vector<string> tempList = {};
	string code;
	string name;

	for (int i = 0; i < csvLine.length(); i++) {
		counter += 1;
		if (csvLine[i] == ',') {
			comma_count++; 

			if (comma_count == 1) { //First comma between code and name	
				code = line_copy.substr(0, counter - 1);
				
			} 
			else if (comma_count == 2) {
				
				name = line_copy.substr(0, counter - 1); // Second comma between name and first preReq
			}
			else {
				tempList.emplace_back(line_copy.substr(0, counter - 1)); // n comma between preReqs
			}

			line_copy = line_copy.substr(counter); //Cut up copy
			counter = 0; //Reset counter as copy size has been reduced
		}
	}

	if (comma_count == 1) { //if there were no preReqs
		name = line_copy;
	}
	else if (comma_count == 2 || !line_copy.empty()) { // if there was only one preReq or a remaining preReq
		tempList.emplace_back(line_copy);
	}

	course = Course(code, name, tempList);

	return course;
}

void MyCourseCSVParser::LoadCSV(BinarySearchTree* tree, string filename) {
	string csvLinefromFile;
	std::ifstream csvFile;

	csvFile.open(filename);
	std::cout << "Opening File: " << filename << std::endl;

	if (!csvFile.is_open()) {
		std::cout << "Failed to open: " << filename << std::endl;
	}

	while (!csvFile.fail()) {
		std::getline(csvFile, csvLinefromFile);

		if (!csvLinefromFile.empty()) {
			Course course = CreateCourseFromCSVLine(csvLinefromFile);
			tree->InsertCourse(course);
		}

	}

	if (!csvFile.eof()) {
		std::cout << "Error: Did not reach the end of the file." << std::endl;
		return;
	}

	std::cout << "Loading Completed" << std::endl;
	std::cout << "Closing File." << std::endl;
	csvFile.close();
}