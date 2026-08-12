#include "Course.h"

//Default Constructor
Course::Course() {}

//Overload Constructor
Course::Course(string code, string name, vector<string> preReqs) {
	this->course_code = code;
	this->course_name = name;
	this->preReqCourses = preReqs;
}

//Destructor
Course::~Course() {}

//Getters
string Course::GetCode() { return this->course_code; }

string Course::GetName() { return this->course_name; }

vector<string> Course::GetPreReqs() { return this->preReqCourses; }

void Course::DisplayContents() {
	std::cout << "Course: " << course_code << " - " <<
		course_name << " PreRequisites: ";
	if (!preReqCourses.empty()) {

		for (int j = 0; j < preReqCourses.size(); j++) {
			std::cout << preReqCourses[j] << " ";
		}

	}
	else {
		std::cout << "None";
	}
	std::cout << std::endl;
}

void Course::SetCode(string code) {
	this->course_code = code;
}

void Course::SetName(string name) {
	this->course_name = name;
}

void Course::AddPreReq(vector<string> preReqs) {
	this->preReqCourses = preReqs;
}