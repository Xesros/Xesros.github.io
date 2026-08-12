/*  
    Course_Catalog_System.cpp : This file contains the 'main' function. Program execution begins and ends there.
    Date: 07/25/26
    Developer: Michael Michel Jr.
    Version: 0.9
*/
#include <iostream>
#include "BinarySearchTree.h"
#include "MyCourseCSVParser.h"

void DisplayMenu() {
    std::cout << "Welcome to the course planner." << std::endl;
    std::cout << std::endl;
    std::cout << "Option 1: Load Courses from file." << std::endl;
    std::cout << "Option 2: Print Course List" << std::endl;
    std::cout << "Option 3: Print a specific Course." << std::endl;
    std::cout << "Option 4: Remove a specific Course." << std::endl;
    std::cout << "Option 9: Exit\n" << std::endl;
    std::cout << "What would you like to do? \n";
}

int main() {
    BinarySearchTree* CourseTree;
    CourseTree = new BinarySearchTree();
    MyCourseCSVParser csvParser;

    string csvFile = "ABCU_Catalog_Course.csv"; //Remove later

    //Holder Values/Vars
    int userChoice = 0;
    string userCourse = "";
    Course course;
    Node* deletedNode = nullptr;

    while (userChoice != 9) {
        DisplayMenu();
        std::cin >> userChoice;

        switch (userChoice) {
            case 1: //Load Courses
                csvParser.LoadCSV(CourseTree, csvFile);
                std::cout << std::endl;
                break;
            case 2: //Print all courses in order
                std::cout << "Printing All Courses -------------" << std::endl;
                CourseTree->PrintTree(); 
                std::cout << std::endl;
                break;
            case 3: //Find a course via code
                std::cout << "Enter a course code: " << std::endl;
                std::cin >> userCourse;
                course = CourseTree->SearchWithinTree(userCourse);
                course.DisplayContents();
                std::cout << std::endl;
                break;
            case 4: //Remove a course via code
                std::cout << "Enter a course code: " << std::endl;
                std::cin >> userCourse;
                deletedNode = CourseTree->RemoveFromTree(userCourse);
                if (deletedNode != nullptr) {
                    std::cout << "Remove Course: ";
                    deletedNode->course.DisplayContents();
                    std::cout << std::endl;
                }
                
                break;
            case 9:
                std::cout << "Goodbye.";
                break;
            default:
                std::cout << userChoice << " is not a valid option." << std::endl;
        }
    }
}