// ProjectTwo.cpp : This file contains the 'main' function. Program execution begins and ends there.


#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
#include <climits>
using namespace std;

//============================ Data Objects ===============================
struct Course { //course object
    string course_Code;
    string course_Name;
    vector<string> preReqCourses;
};

//
class HashTable {
private: 
    struct Node { //Structure to hold courses
        Course course;
        unsigned int key;
        Node* next;

        Node() {
            key = UINT_MAX;
            next = nullptr;
        }

        Node(Course newCourse) {
            course = newCourse;
        }

        Node(Course newCourse, unsigned int newKey) {
            key = newKey;
            course = newCourse;
            next = nullptr;
        }
    };

    vector<Node> nodes; //vector of pointers
    unsigned int tableSize = 20; //default size - will change as the data grows
    unsigned int hash(string key);

public:
    HashTable();
    HashTable(unsigned int size);
    virtual ~HashTable();
    void Insert(Course course);
    void PrintLowToHigh();
    void PrintAll();
    Course Search(string course_Code);
};

//=========================== Hash Table Operations ============================

HashTable::HashTable() { //Default Constructor
    nodes.resize(tableSize);
}

HashTable::HashTable(unsigned int size) { //overload constructor for a different size
    this->tableSize = size;
    nodes.resize(tableSize);
}

HashTable::~HashTable() { //destructor clear out space used by data structure
    nodes.clear();
}

unsigned int HashTable::hash(string course_Code) { //string hash, mulpticative summation of string's chars
    unsigned int hashKey = 0;
    for (int i = 0; i < course_Code.length(); ++i) {
        hashKey = (hashKey * 2) + course_Code.at(i);
    }
    return hashKey % tableSize; //fit to table
}

void HashTable::Insert(Course course){
    unsigned int key = hash(course.course_Code); //generate a key

    Node* foundNode = &nodes[key]; // retriveve node using said key

    if (foundNode == nullptr) { //uninitialized node location
        Node* courseNode = new Node(course, key); //create new Node
        nodes.insert(nodes.begin() + key, *courseNode); // assign new node into position key
    }
    else if (foundNode->key == UINT_MAX) { //initialized but not used
        //assign data to node at position key
        foundNode->key = key;
        foundNode->course = course;
        foundNode->next = nullptr;
    }
    else { //find the open node next to insert - handle with chaining
        while(foundNode->next != nullptr){
            foundNode = foundNode->next;
        }
        foundNode->next = new Node(course, key); //insert node into the chain
    }
}

void HashTable::PrintAll() {
    Node* nodeToPrint; 

    for (int i = 0; i < tableSize; ++i) { // i = 0. start at the beginning
        nodeToPrint = &nodes[i];
        if (nodeToPrint->key != UINT_MAX) { //if key not equal to UINT_MAX
            cout << "\nKey " << nodeToPrint->key << ": "  
                << nodeToPrint->course.course_Code << " | "
                << nodeToPrint->course.course_Name << " | " << endl;
            nodeToPrint = nodeToPrint->next;  // node is equal to next iter
            while (nodeToPrint != nullptr) { // while node->next not equal to nullptr
                cout << "\nKey " << nodeToPrint->key << ": "
                    << nodeToPrint->course.course_Code << " | "
                    << nodeToPrint->course.course_Name << " | " << endl;
                nodeToPrint = nodeToPrint->next; //continue through nodes linked at location
            }
        }
    }
}


void HashTable::PrintLowToHigh() { //duplicate - sort - print
    vector<Course> SortedDupe; 
    //================ Copy Each Course ====================
    Node* courseToInsert;
    for (int i = 0; i < tableSize; ++i) { // i = 0. start at the beginning
        courseToInsert = &nodes[i];
        if (courseToInsert->key != UINT_MAX) { //if key not equal to UINT_MAX
            SortedDupe.push_back(courseToInsert->course);
            courseToInsert = courseToInsert->next;  // node is equal to next iter
            while (courseToInsert != nullptr) { // while node->next not equal to nullptr
                SortedDupe.push_back(courseToInsert->course); //copy chain too
                courseToInsert = courseToInsert->next;
            }
        }
    }
    //=========== Selection Sort ============ //modified condition
    int min; 
    int outer = 0;
    int inner = 0;
    int size = SortedDupe.size();
    for (outer = 0; outer < size - 1; outer++) {
        min = outer; //set min = position

        //loop over remaining elements to the right
        for (inner = 1; inner < size; inner++) {  //filter by Prepending Department
            if (SortedDupe[min].course_Code.substr(0,4).compare(SortedDupe[inner].course_Code.substr(0, 4)) != 0) {
                min = inner; //this element becomes the minimum
            }                   //If same department check number
            else if (SortedDupe[min].course_Code.substr(4) > SortedDupe[inner].course_Code.substr(4)) { 
                   min = inner; //this element becomes the minimum
               }
        }
        if (SortedDupe[outer].course_Code > SortedDupe[min].course_Code) { //one final check
            swap(SortedDupe[outer], SortedDupe[min]); //swap current outer with the smaller one (min) found
        }
    }

    //======== Print Each Element ================
    cout << "Here are the list of courses:" << endl;
    for (int i = 0; i < SortedDupe.size(); ++i) {
        cout << SortedDupe[i].course_Code
        << ", " << SortedDupe[i].course_Name << endl;
        
    }
}

Course HashTable::Search(string course_Code) {
    Course course;

    unsigned int key = hash(course_Code); //hash a key from the course code
    Node* foundNode = &nodes[key];

    if (foundNode == nullptr) { //empty entry - no course to be found
        return course;
    }

    while (foundNode != nullptr) {
        if (foundNode->course.course_Code == course_Code) {
            return foundNode->course; //return found course
        }
        foundNode = foundNode->next; //check the chain for desired course
    }

    return course;
}
//============= CSV File loading Operations =======================
Course CreateCourseFromCSVLine(string line_Course) {
    Course course;
    string code = "";
    string name = "";
    vector<string> tempPreList = {};
    int comma_Count = 0;
    while (line_Course.length() > 1) { //while line is not empty 
        for (int i = 0; i < line_Course.length(); ++i) {
            if (line_Course[i] == ',') {
                comma_Count++;
                if (comma_Count == 1) {
                    code = line_Course.substr(0, i); //cut out desired chars from start to comma
                }
                else if (comma_Count == 2) {
                    name = line_Course.substr(0, i);
                }
                else{
                    tempPreList.push_back(line_Course.substr(0, i));  //append string to list
                }
                line_Course = line_Course.substr(i + 1); //skip comma
                i = 0; //reset as length of string has changed
            }
            else if(i == line_Course.length() - 1){
                tempPreList.push_back(line_Course); //at ending where there is no comma but a preRequisite
                line_Course = ""; //end of line
            }
        }
    }

    if (code.compare("") == 0 || code.length() != 7) {
        cout << "Error in Input Code - Check Input" << endl;
        course.course_Code = "Error";
        return course;
    }
    if (name.compare("") == 0) {
        cout << "Error in Input Name - Check Input" << endl;
        course.course_Name = "Error";
        return course;
    }

    //assign course with data
    course.course_Code = code;
    course.course_Name = name;
    course.preReqCourses = tempPreList;

    return course; //return course to insert into data structure
}

void LoadCoursesFromCSV(string CSVName, HashTable* courseTable) { //read file
    string lineFromFile;
    ifstream csvFile;
    csvFile.open(CSVName);
    cout << "Opening File: " << CSVName << endl;

    if (!csvFile.is_open()) { //check for proper usage
        cout << "Failed to open: " << CSVName << endl;
        return; //error prompt and exit
    }

    while (!csvFile.fail()) { // actively checking for errors
        getline(csvFile, lineFromFile); //get line from file
        if (lineFromFile.length() > 6) { //error checking line if empty skip
            Course course = CreateCourseFromCSVLine(lineFromFile);
            courseTable->Insert(course);
        }
    }

    if (!csvFile.eof()) {
        cout << "Error: Did not reach the end of the file." << endl;
        return;
    }

    cout << "Loading Completed" << endl;
    cout << "Closing File." << endl;
    csvFile.close();
}



//============ User Interface and Menu ==========================
void DisplayMenu() {
    cout << endl;
    cout << "Option 1: Load Courses from file." << endl;
    cout << "Option 2: Print Course List" << endl;
    cout << "Option 3: Print a specific Course." << endl;
    cout << "Option 9: Exit\n" << endl;
    cout << "What would you like to do? ";
}

int main()
{
    HashTable* courseTable;
    courseTable = new HashTable();

    string csvFile = "CS 300 ABCU_Advising_Program_Input.csv";
    string course_Code;
    string temp_Code;
    Course foundCourse; //holder for search function
    int userChoice = 0;

    cout << "Welcome to the course planner. \n"; //start prompt

    while (userChoice != 9) {

        DisplayMenu(); //output menu and get user input
        cin >> userChoice;

        switch (userChoice) {
        
        case 1: // Load Courses from file
            LoadCoursesFromCSV(csvFile, courseTable);
            break;
        case 2: // Print Courses Alphanumberically (Sort and Print) 
            courseTable->PrintLowToHigh();
            break;
        case 3: // Print a specific course (Search)
            cout << "Enter Course Code to find: "; 
            cin >> course_Code; //get course code from user
            temp_Code = "";
            for (int i = 0; i < course_Code.length(); i++) { //hard coded toUpper
                if (course_Code.at(i) < 122 && course_Code.at(i) > 97) { //if a lower case char
                    temp_Code += (course_Code.at(i) - 32); //convert to uppercase
                }
                else {
                    temp_Code += course_Code.at(i);
                }
            }
            course_Code = temp_Code; //set course_code to updated variant

            foundCourse = courseTable->Search(course_Code); //search for course in data structure
            
            //Print Details
            if (!foundCourse.course_Code.empty()) {
                cout << foundCourse.course_Code <<
                ", " << foundCourse.course_Name << endl;
                if (foundCourse.preReqCourses.empty()) { //Check for prerequisites
                    cout << "No Prerequisites for this course." << endl; 
                }
                else {
                    cout << "Prerequisites for this course: ";
                    for (int i = 0; i < foundCourse.preReqCourses.size(); i++) {
                        cout << foundCourse.preReqCourses[i];
                        if (i != foundCourse.preReqCourses.size() - 1) {
                            cout << ", ";
                        }
                    }
                    cout << endl;
                }
            }
            else {
                cout << "Course: " << course_Code << " not found." << endl; //Inform user of an unknown code
            }
            break;

        case 9: //exit program
            break;
        
        default: //invalid input
            cout << userChoice << " is not a valid option." << endl;
        }
        
    }
    cout << "Good bye." << endl; //exit program

    return 0;
}
