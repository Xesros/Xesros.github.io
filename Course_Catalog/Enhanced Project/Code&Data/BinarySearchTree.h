#pragma once

#include "Course.h"

// Node Object
struct Node {
	Node* left;
	Node* right;
	Course course;

	Node() {
		left = nullptr;
		right = nullptr;
	}
	Node(Course course) { 
		left = nullptr;
		right = nullptr;
		this->course = course; 
	}
};

// Tree of Nodes
class BinarySearchTree {
	Node* root;

	Node* addNodetoTree(struct Node* node, Course course);

	public:
		//Constructors
		BinarySearchTree();
		BinarySearchTree(Node* root);

		//Destructor
		virtual ~BinarySearchTree();

		//Methods
		void InsertCourse(Course course);
		void PrintFromNode(Node* node);
		void PrintTree();

		Node* Search(Node* node, string code);
		Course SearchWithinTree(string code);
		Node* RemoveCourse(Node* node, string code);
		Node* FindValidChild(Node* node);
		Node* RemoveFromTree(string code);
};

