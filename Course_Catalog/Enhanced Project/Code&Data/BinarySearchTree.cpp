#include "BinarySearchTree.h"

//Default Constructor
BinarySearchTree::BinarySearchTree() {
	this->root = nullptr;
}

//Overload Constructor
BinarySearchTree::BinarySearchTree(Node* root) {
	this->root = root;
}

//Destructor
BinarySearchTree::~BinarySearchTree() { //Clear the Data Structure
	delete root;
}

Node* BinarySearchTree::addNodetoTree(Node* node, Course course) {
	//Check if tree is empty
	if (node == nullptr) {
		return new Node(course);
	}

	// If not empty, check if it should go left or right
	if (course.GetCode() < node->course.GetCode()) {
		node->left = addNodetoTree(node->left, course);
	} 
	else if (course.GetCode() > node->course.GetCode()) {
		node->right = addNodetoTree(node->right, course);
	}

	return node; //else - we are where we want to be
}

//Helper Method ^
void BinarySearchTree::InsertCourse(Course course) {
	//if tree is has no root, set it
	if (root == nullptr) {
		root = new Node(course);
	} //Otherwise,
	else {
		addNodetoTree(root, course);
	}

	//Debug 
	std::cout << "Successfully added: " << course.GetName() << " - " << course.GetCode() << " PreReqs: ";
	if (!course.GetPreReqs().empty()) {

		for (int j = 0; j < course.GetPreReqs().size(); j++) {
			std::cout << course.GetPreReqs()[j] << " ";
		}

	}
	else {
		std::cout << "None";
	}
	std::cout << std::endl;
}

void BinarySearchTree::PrintFromNode(Node* node) { //Print Left to Right
	if (node != nullptr) {
		PrintFromNode(node->left);
		node->course.DisplayContents();
		PrintFromNode(node->right);
	}
}

void BinarySearchTree::PrintTree() { //Previous method is for any node, so we use the root for all nodes
	PrintFromNode(root);
}

Node* BinarySearchTree::Search(Node* node, string code) { //add node to search
	//Check if the tree is empty
	if (node == nullptr) {
		std::cout << "Course not found" << std::endl;
		return node;
	}
	else if (node->course.GetCode() == code){
		return node;
	}

	if (code < node->course.GetCode()) {
		return Search(node->left, code);
	}

	return Search(node->right, code);
}

Course BinarySearchTree::SearchWithinTree(string code) {
	Node* result = Search(root, code);
	Course course;
	if (result == nullptr) {
		return course;
	}
	return result->course;
}

//Helper Method
Node* BinarySearchTree::FindValidChild(Node* node) {
	node = node->right;
	while (node != nullptr && node->left != nullptr) {
		node = node->left;
	}
	return node;
}

Node* BinarySearchTree::RemoveCourse(Node* node, string code) { //complete Remove function
	if (node == nullptr) { //Check if end
		return node;
	}

	if (node->course.GetCode() > code) { //Go left if greater
		node->left = RemoveCourse(node->left, code);
	}
	else if(node->course.GetCode() < code) { //Go right is less
		node->right = RemoveCourse(node->right, code);
	}
	else { // Node with one or no children
		if (node->left == nullptr) { 
			Node* temp = node->right;
			delete node;
			return temp;
		}
		if (node->right == nullptr) {
			Node* temp = node->left;
			delete node;
			return temp;
		}

		//has 2 children
		Node* child = FindValidChild(node);
		node->course = child->course;
		node->right = RemoveCourse(node->right, child->course.GetCode());
	}
	return node;
}

Node* BinarySearchTree::RemoveFromTree(string code) {
	return RemoveCourse(root, code);
}