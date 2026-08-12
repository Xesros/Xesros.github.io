# Course Catalog System

## About
The goal of the course catalog system is to utilize a data structure of reasonable performance
 and capabilities to store and manage a universities courses. The course object themselves are comprised of a code, name, and
 a set of prequisites. The expected operations of the application are a printed sort from lowest to highest, a custom csv parser, 
 and a command line interface to use the data structure.

## Differences - Enhancements
The [original project](https://github.com/Xesros/Xesros.github.io/tree/main/Course_Catalog/Original%20Project) utilizes a hash table to store the 
course objects. The hash table while very fast in its operations in terms of search, delete, and insertion at a speed of O(1). 
However, to meet the needs of the project the table uses a selection sort to print all objects in order. This sort has a speed of O(n^2). 
Furthermore, with course objects containing a unique identifier code. There is not exactly a need for hashing, unless we were attempting to add
a layer of security to our project. Lastly, the entire project lacks a proper naming condition, lacks the data to load, and the entirety of the program is contained in one c++ file. 

The [enhanced project](https://github.com/Xesros/Xesros.github.io/tree/main/Course_Catalog/Enhanced%20Project/Code%26Data) uses a binary search tree 
(BST). The time complexity of the base operations of search, access, delete, and insertion are O(log n) on average. 
There is also no need to implement a sort algorithm. The structure is built in a sorted order. 
Instead, the BST's data is read left to right to print in a sorted manner. The time complexity of this operation is O(n). A goal of the new version was to modularize the project and use proper naming conventions. 
These improve the readibility of my work so others can understand the code of the project. The previous iteration is unacceptable in terms of quality. This iteration also has a delete operation and includes the data to load into the program. Lastly, the CSV parser was changed to adhere to better programming practices. It no longer modifies the loop condition and edits a copy instead.

## How to (Enhanced Version)
- This project was created in visual studio, so this will adhere to said IDE.
1. Create an empty project that using the console app template.
2. Copy the files into the project. This can be done by copying the text into created files or importing. Make sure it builds properly.
    *  .h files goes to header folder, the rest go into the source folder including the csv file (the data).
3. Build and Run the program.
4. The program includes a menu. Start with loading the csv file, Option 1.
5. At this point you can now use the other options. 
    * Option 2 will print all the information in a sorted manner. This is only possible when the data is loaded.
    * Option 3 will prompt the user for a course code to search in the data structure. Once inputted, if it exists, it will return a course.
    * Option 4 will prompt the user for a course code to delete from the data structure. Once inputted, if it exists, it removes and returns a course.
    * Option 9 will safely exit the program.
6. Use the last option to exit the program when done.