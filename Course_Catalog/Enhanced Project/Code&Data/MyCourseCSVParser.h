#pragma once

#include "BinarySearchTree.h"
#include <iostream>
#include <fstream>
#include <sstream>

class MyCourseCSVParser{

	public:
	//Constructor
		MyCourseCSVParser();

	//Destructor
		virtual ~MyCourseCSVParser();

	//Methods
		Course CreateCourseFromCSVLine(string csv_line);
		void LoadCSV(BinarySearchTree* tree, string filename);
};

