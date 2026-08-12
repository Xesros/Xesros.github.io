#include <vector>
#include <iostream>

using std::vector;
using std::string;

class Course {
	string course_code;
	string course_name;
	vector<string> preReqCourses;

	public:
	//Constructors
		Course();
		Course(string course_code, string course_name, vector<string> preReqCourses);

	//Destructor
		virtual ~Course();

	//Getters
		string GetCode();
		string GetName();
		vector<string> GetPreReqs();
		void DisplayContents();

	//Setters
		void SetCode(string code);
		void SetName(string name);
		void AddPreReq(vector<string> preReqs);
};
