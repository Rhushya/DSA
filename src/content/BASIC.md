
---
# BASIC



# Arrays

## Static Arrays (`02 ARRAYS/03 STATIC ARRAYS/03 STATIC ARRAY PYTHON CODE.txt`)
```python
# Insert n into arr at the next open position.
# Length is the number of 'real' values in arr, and capacity
# is the size (aka memory allocated for the fixed size array).
def insertEnd(arr, n, length, capacity):
    if length < capacity:
        arr[length] = n

# Remove from the last position in the array if the array
# is not empty (i.e. length is non-zero).
def removeEnd(arr, length):
    if length > 0:
        # Overwrite last element with some default value.
        # We would also the length to decreased by 1.
        arr[length - 1] = 0

# Insert n into index i after shifting elements to the right.
# Assuming i is a valid index and arr is not full.
def insertMiddle(arr, i, n, length):
    # Shift starting from the end to i.
    for index in range(length - 1, i - 1, -1):
        arr[index + 1] = arr[index]
    # Insert at i
    arr[i] = n

# Remove value at index i before shifting elements to the left.
# Assuming i is a valid index.
def removeMiddle(arr, i, length):
    # Shift starting from i + 1 to end.
    for index in range(i + 1, length):
        arr[index - 1] = arr[index]
    # No need to 'remove' arr[i], since we already shifted

def printArr(arr, capacity):
    for i in range(capacity):
        print(arr[i])
```

## Dynamic Arrays (`02 ARRAYS/04 DYNAMIC ARRAYS/PYTHON CODE.txt`)
```python
# Python arrays are dynamic by default, but this is an example of resizing.
class Array:
    def __init__(self):
        self.capacity = 2
        self.length = 0
        self.arr = [0] * 2 # Array of capacity = 2

    # Insert n in the last position of the array
    def pushback(self, n):
        if self.length == self.capacity:
            self.resize()
        # insert at next empty position
        self.arr[self.length] = n
        self.length += 1

    def resize(self):
        # Create new array of double capacity
        self.capacity = 2 * self.capacity
        newArr = [0] * self.capacity 
        # Copy elements to newArr
        for i in range(self.length):
            newArr[i] = self.arr[i]
        self.arr = newArr

    # Remove the last element in the array
    def popback(self):
        if self.length > 0:
            self.length -= 1

    # Get value at i-th index
    def get(self, i):
        if i < self.length:
            return self.arr[i]
        # Here we would throw an out of bounds exception

    # Insert n at i-th index
    def insert(self, i, n):
        if i < self.length:
            self.arr[i] = n
            return
        # Here we would throw an out of bounds exception       

    def print(self):
        for i in range(self.length):
            print(self.arr[i])
        print()
```

## Stacks (`02 ARRAYS/05 STACKS/PYTHON CODE.txt`)
```python
# Implementing a stack is trivial using a dynamic array
# (which we implemented earlier).
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, n):
        self.stack.append(n)

    def pop(self):
        return self.stack.pop()
```

---

# Linked Lists

## Singly Linked List (`03 LINKED LISTS/06 SINGLY LINKED LISTS/PYTHON CODE.txt`)
```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

# Implementation for Singly Linked List
class LinkedList:
    def __init__(self):
        # Init the list with a 'dummy' node which makes 
        # removing a node from the beginning of list easier.
        self.head = ListNode(-1)
        self.tail = self.head
    
    def insertEnd(self, val):
        self.tail.next = ListNode(val)
        self.tail = self.tail.next

    def remove(self, index):
        i = 0
        curr = self.head
        while i < index and curr:
            i += 1
            curr = curr.next
        # Remove the node ahead of curr
        if curr:
            curr.next = curr.next.next

    def print(self):
        curr = self.head.next
        while curr:
            print(curr.val, ' -> ')
            curr = curr.next
        print()
```

## Doubly Linked List (`03 LINKED LISTS/07 DOUBLY LINKED LISTS/PYTHON CODE.txt`)
```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None
        self.prev = None

# Implementation for Doubly Linked List
class LinkedList:
    def __init__(self):
        # Init the list with 'dummy' head and tail nodes which makes 
        # edge cases for insert & remove easier.
        self.head = ListNode(-1)
        self.tail = ListNode(-1)
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def insertFront(self, val):
        newNode = ListNode(val)
        newNode.prev = self.head
        newNode.next = self.head.next

        self.head.next.prev = newNode
        self.head.next = newNode

    def insertEnd(self, val):
        newNode = ListNode(val)
        newNode.next = self.tail
        newNode.prev = self.tail.prev

        self.tail.prev.next = newNode
        self.tail.prev = newNode

    # Remove first node after dummy head (assume it exists)
    def removeFront(self):
        self.head.next.next.prev = self.head
        self.head.next = self.head.next.next

    # Remove last node before dummy tail (assume it exists)
    def removeEnd(self):
        self.tail.prev.prev.next = self.tail
        self.tail.prev = self.tail.prev.prev

    def print(self):
        curr = self.head.next
        while curr != self.tail:
            print(curr.val, " -> ")
            curr = curr.next
        print()
```

## Queues (`03 LINKED LISTS/08 QUEUES/PYTHON CODE.txt`)
```python
class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

class Queue:
    # Implementing this with dummy nodes would be easier!
    def __init__(self):
        self.left = self.right = None
    
    def enqueue(self, val):
        newNode = ListNode(val)
        # Queue is non-empty
        if self.right:
            self.right.next = newNode
            self.right = self.right.next
        # Queue is empty
        else:
            self.left = self.right = newNode

    def dequeue(self):
        # Queue is empty
        if not self.left:
            return None
        # Remove left node and return value
        val = self.left.val
        self.left = self.left.next
        return val

    def print(self):
        cur = self.left
        while cur:
            print(cur.val, ' -> ', end ="")
            cur = cur.next
        print() # new line
```

---
## Linked List Extra 



## 1. Single Linked List

### Structure and Basic Operations

````python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SingleLinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, val):
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
    
    ## NOTE WHEN YOU GO FOR INSERTION AND DELETION IN LINKED LIST YOU ALWAYS SEE current.next in while loop 


    def insert_at_end(self, val):
        new_node = ListNode(val)
        if not self.head:   // this means , if there is no self.head = NULL or false then the self.head=new_node will be executed 
            self.head = new_node
            return
        current = self.head
        while current.next:    // note to use these types in just traversal where you want to reach the end 
            current = current.next
        current.next = new_node
    
    def delete_node(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        current = self.head
        while current.next and current.next.val != val:
            current = current.next
        if current.next:
            current.next = current.next.next
    
    ## NOTE WHEN YOU GO FOR SEARCHING  AND DISPLAYING  IN LINKED LIST YOU ALWAYS SEE current in while loop 


    def search(self, val):
        current = self.head
        while current:
            if current.val == val:
                return True
            current = current.next
        return False
    
    def display(self):
        result = []
        current = self.head
        while current:  //   note to use these types in just traversal where you want to print value and traverse  till end
            result.append(current.val)    
            current = current.next
        return result
````

## 2. Double Linked List

````python
class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    
    def insert_at_beginning(self, val):
        new_node = DoublyListNode(val)
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
    
    def insert_at_end(self, val):
        new_node = DoublyListNode(val)
        if not self.tail:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
    
    def delete_node(self, val):
        current = self.head
        while current:
            if current.val == val:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next
                
                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev
                return
            current = current.next
    
    def display_forward(self):
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result
    
    def display_backward(self):
        result = []
        current = self.tail
        while current:
            result.append(current.val)
            current = current.prev
        return result
````

## 3. Circular Linked List

````python
class CircularListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class CircularLinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, val):
        new_node = CircularListNode(val)
        if not self.head:
            self.head = new_node
            new_node.next = new_node
        else:
            # Find the last node
            current = self.head
            while current.next != self.head:
                current = current.next
            new_node.next = self.head
            current.next = new_node
            self.head = new_node
    
    def insert_at_end(self, val):
        new_node = CircularListNode(val)
        if not self.head:
            self.head = new_node
            new_node.next = new_node
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = new_node
            new_node.next = self.head
    
    def delete_node(self, val):
        if not self.head:
            return
        
        # If only one node
        if self.head.next == self.head and self.head.val == val:
            self.head = None
            return
        
        # If head needs to be deleted
        if self.head.val == val:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = self.head.next
            self.head = self.head.next
            return
        
        # Delete other nodes
        current = self.head
        while current.next != self.head:
            if current.next.val == val:
                current.next = current.next.next
                return
            current = current.next
    
    def display(self):
        if not self.head:
            return []
        result = []
        current = self.head
        while True:
            result.append(current.val)
            current = current.next
            if current == self.head:
                break
        return result
````

## 4. Most Asked LeetCode Questions by Category

### Easy Level Questions:
1. **Reverse Linked List (206)**
2. **Merge Two Sorted Lists (21)**
3. **Remove Duplicates from Sorted List (83)**
4. **Linked List Cycle (141)**
5. **Palindrome Linked List (234)**
6. **Delete Node in a Linked List (237)**

### Medium Level Questions:
1. **Add Two Numbers (2)**
2. **Remove Nth Node From End (19)**
3. **Swap Nodes in Pairs (24)**
4. **Rotate List (61)**
5. **Partition List (86)**
6. **Linked List Cycle II (142)**

### Hard Level Questions:
1. **Merge k Sorted Lists (23)**
2. **Reverse Nodes in k-Group (25)**

## 5. Common Patterns and Solutions

### Pattern 1: Two Pointers (Fast & Slow)

## "if not head " this means it it used to check if the linked list is null that is empty , just to check for the edge case  
````python
# Detect cycle in linked list
def has_cycle(head):
    if not head or not head.next:
        return False
    
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Find middle of linked list
def find_middle(head):
    if not head:
        return None
    
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
````

### Pattern 2: Reverse Linked List Variations

````python
# Reverse entire linked list
def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev

# Reverse first n nodes
def reverse_n(head, n):
    if n == 1:
        return head
    
    prev = None
    current = head
    count = 0
    
    while current and count < n:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
        count += 1
    
    if head:
        head.next = current
    
    return prev
````

### Pattern 3: Merge Operations

````python
# Merge two sorted lists
def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next
````

## 6. Key Problem-Solving Techniques

### 1. **Dummy Node Pattern**
- Use when you might need to modify the head
- Simplifies edge cases

### 2. **Two Pointers**
- Fast/Slow for cycle detection and finding middle
- Distance-based for removing nth from end

### 3. **Stack for Palindrome Check**
- Store first half, compare with second half

### 4. **Recursion for Reversal**
- Clean recursive solutions for reversal problems

## 7. Time & Space Complexities

| Operation | Single LL | Double LL | Circular LL |
|-----------|-----------|-----------|-------------|
| Insert Beginning | O(1) | O(1) | O(1) |
| Insert End | O(n) | O(1) | O(n) |
| Delete | O(n) | O(n) | O(n) |
| Search | O(n) | O(n) | O(n) |
| Space | O(1) | O(1) | O(1) |


---
## Fibonacci (`04 RECURSION/10 FIBONACCI/PYTHON CODE.txt`)
```python
# Recursive implementation to calculate the n-th Fibonacci number
def fibonacci(n):
    # Base case: n = 0 or 1
    if n <= 1:
        return n
    # Recursive case: fib(n) = fib(n - 1) + fib(n - 2)
    return fibonacci(n - 1) + fibonacci(n - 2)
```

---

# Sorting

## Insertion Sort (`05 SORTING/11 INSERTION SORT/PYTHON CODE.txt`)
```python
# Python implementation of Insertion Sort
def insertionSort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        j = i - 1
        while j >= 0 and arr[j + 1] < arr[j]:
            # arr[j] and arr[j + 1] are out of order so swap them 
            tmp = arr[j + 1]
            arr[j + 1] = arr[j]
            arr[j] = tmp
            j -= 1
    return arr
```

## Merge Sort (`05 SORTING/12 MERGE SORT/PYTHON CODE.txt`)
```python
# Implementation of MergeSort
def mergeSort(arr, s, e):
    if e - s + 1 <= 1:
        return arr
    # The middle index of the array
    m = (s + e) // 2
    # Sort the left half
    mergeSort(arr, s, m)
    # Sort the right half
    mergeSort(arr, m + 1, e)
    # Merge sorted halfs
    merge(arr, s, m, e)
    return arr

# Merge in-place
def merge(arr, s, m, e):
    # Copy the sorted left & right halfs to temp arrays
    L = arr[s: m + 1]
    R = arr[m + 1: e + 1]
    i = 0 # index for L
    j = 0 # index for R
    k = 0 # index for arr
    # Merge the two sorted halfs into the original array
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1
    # One of the halfs will have elements remaining
    while i < len(L):
        arr[k] = L[i]
        i += 1
        k += 1
    while j < len(R):
        arr[k] = R[j]
        j += 1
        k += 1
```

## Quick Sort (`05 SORTING/13 QUICK SORT/PYTHON CODE.txt`)
```python
# Implementation of QuickSort
def quickSort(arr, s, e):
    if e - s + 1 <= 1:
        return
    pivot = arr[e]
    left = s # pointer for left side
    # Partition: elements smaller than pivot on left side
    for i in range(s, e):
        if arr[i] < pivot:
            tmp = arr[left]
            arr[left] = arr[i]
            arr[i] = tmp
            left += 1
    # Move pivot in-between left & right sides
    arr[e] = arr[left]
    arr[left] = pivot
    # Quick sort left side
    quickSort(arr, s, left - 1)
    # Quick sort right side
    quickSort(arr, left + 1, e)
    return arr
```

## Bucket Sort (`05 SORTING/14 BUCKET SORT/PYTHON CODE.txt`)
```python
def bucketSort(arr):
    # Assuming arr only contains 0, 1 or 2
    counts = [0, 0, 0]
    # Count the quantity of each val in arr
    for n in arr:
        counts[n] += 1
    # Fill each bucket in the original array
    i = 0
    for n in range(len(counts)):
        for j in range(counts[n]):
            arr[i] = n
            i += 1
    return arr
```

---

---
# ADDITIONAL SORTING ALGORITHMS FROM MERGED FILES
---
```python
def bubble_sort(arr):
    """
    Bubble Sort - Time Complexity: O(n²)
    Repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.
    """
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

def selection_sort(arr):
    """
    Selection Sort - Time Complexity: O(n²)
    Finds minimum element in unsorted region and swaps with first unsorted element.
    """
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

def merge_sort(arr):
    """
    Merge Sort - Time Complexity: O(n log n)
    Divides array into two halves, recursively sorts them and then merges the sorted halves.
    """
    if len(arr) <= 1:
        return arr

    # Divide array into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    # Recursively sort the two halves
    left = merge_sort(left)
    right = merge_sort(right)

    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    less = [x for x in arr[1:] if x <= pivot]
    greater = [x for x in arr[1:] if x > pivot]
    return quick_sort(less) + [pivot] + quick_sort(greater)

def bucket_sort(arr):
    counts = [0, 0, 0]  # For values 0-2
    for n in arr:
        counts[n] += 1
    i = 0
    for n in range(len(counts)):
        for _ in range(counts[n]):
            arr[i] = n
            i += 1
    return arr
---
```
# Binary Search

## Search Array (`06 BINARY SEARCH/15 SEARCH ARRAY/PYTHON CODE.txt`)
```python
arr = [1, 3, 3, 4, 5, 6, 7, 8]

# Python implementation of Binary Search
def binarySearch(arr, target):
    L, R = 0, len(arr) - 1
    while L <= R:
        mid = (L + R) // 2
        if target > arr[mid]:
            L = mid + 1
        elif target < arr[mid]:
            R = mid - 1
        else:
            return mid
    return -1
```

---

# Trees

## Binary Search Tree Search (`07 TREES/18 BINARY SEARCH TREES/PYTHON CODE.txt`)
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def search(root, target):
    if not root:        # this means if root is null or none return False
        return False
    if target > root.val:
        return search(root.right, target)
    elif target < root.val:
        return search(root.left, target)
    else:
        return True
```

## BST Insert and Remove (`07 TREES/19 BST INSERT AND Remove/PYTHON CODE.txt`)
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Insert a new node and return the root of the BST.
def insert(root, val):
    if not root:
        return TreeNode(val)
    if val > root.val:
        root.right = insert(root.right, val)
    elif val < root.val:
        root.left = insert(root.left, val)
    return root

# Return the minimum value node of the BST.
def minValueNode(root):
    curr = root
    while curr and curr.left:
        curr = curr.left
    return curr

# Remove a node and return the root of the BST.
def remove(root, val):
    if not root:
        return None
    if val > root.val:
        root.right = remove(root.right, val)
    elif val < root.val:
        root.left = remove(root.left, val)
    else:
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
        else:
            minNode = minValueNode(root.right)
            root.val = minNode.val
            root.right = remove(root.right, minNode.val)
    return root
```

## Depth-First Search (`07 TREES/20 Depth-First Search/PYTHON CODE.txt`)
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def inorder(root):
    if not root:
        return    
    inorder(root.left)
    print(root.val)
    inorder(root.right)

def preorder(root):
    if not root:
        return    
    print(root.val)
    preorder(root.left)
    preorder(root.right)

def postorder(root):
    if not root:
        return    
    postorder(root.left)
    postorder(root.right)
    print(root.val)
```

## Breadth-First Search (`07 TREES/21 Breadth-First Search/PYTHON CODE.txt`)
```python
from collections import deque

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def bfs(root):
    queue = deque()
    if root:
        queue.append(root)
    level = 0
    while len(queue) > 0:
        print("level: ", level)
        for i in range(len(queue)):
            curr = queue.popleft()
            print(curr.val)
            if curr.left:
                queue.append(curr.left)
            if curr.right:
                queue.append(curr.right)
        level += 1
```

---

---

# Understanding Trees in Data Structures

I'll explain the key concepts covered in the Trees section of the NeetCode course, with Python code examples for each topic.

## 1. Binary Search Trees (BST)

A Binary Search Tree is a tree data structure where each node has at most two children, and for any node:
- All values in the left subtree are less than the node's value
- All values in the right subtree are greater than the node's value

This property makes searching efficient with O(log n) time complexity in balanced trees.

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def search(root, target):
    if not root:
        return False
    
    if target > root.val:
        return search(root.right, target)
    elif target < root.val:
        return search(root.left, target)
    else:
        return True
```

## 2. BST Insert and Remove Operations

### Insert
To insert a value in a BST, we recursively traverse the tree to find the appropriate position:

```python
def insert(root, val):
    if not root:
        return TreeNode(val)
    
    if val > root.val:
        root.right = insert(root.right, val)
    elif val < root.val:
        root.left = insert(root.left, val)
    return root
```

### Remove
Removing a node is more complex, especially when the node has two children:

```python
def minValueNode(root):
    curr = root
    while curr and curr.left:
        curr = curr.left
    return curr

def remove(root, val):
    if not root:
        return None
    
    if val > root.val:
        root.right = remove(root.right, val)
    elif val < root.val:
        root.left = remove(root.left, val)
    else:
        # Case 1: Leaf node or node with one child
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
        
        # Case 2: Node with two children
        # Find inorder successor (smallest in right subtree)
        minNode = minValueNode(root.right)
        root.val = minNode.val
        # Delete the inorder successor
        root.right = remove(root.right, minNode.val)
    return root
```

## 3. Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. There are three main types of DFS traversals:

### Inorder Traversal (Left → Root → Right)
```python
def inorder(root):
    if not root:
        return    
    inorder(root.left)
    print(root.val)  # Process the node
    inorder(root.right)
```

### Preorder Traversal (Root → Left → Right)
```python
def preorder(root):
    if not root:
        return    
    print(root.val)  # Process the node
    preorder(root.left)
    preorder(root.right)
```

### Postorder Traversal (Left → Right → Root)
```python
def postorder(root):
    if not root:
        return    
    postorder(root.left)
    postorder(root.right)
    print(root.val)  # Process the node
```

## 4. Breadth-First Search (BFS)

BFS explores all nodes at the present depth before moving to nodes at the next depth level. It uses a queue to keep track of nodes to visit:

```python
from collections import deque

def bfs(root):
    queue = deque()
    
    if root:
        queue.append(root)
    
    level = 0
    while queue:
        print(f"level: {level}")
        # Process all nodes at current level
        for i in range(len(queue)):
            curr = queue.popleft()
            print(curr.val)
            
            # Add children to queue for next level
            if curr.left:
                queue.append(curr.left)
            if curr.right:
                queue.append(curr.right)
        level += 1
```

## Key Applications and Problems

1. **BST Operations**:
   - Search in a Binary Search Tree
   - Finding the Lowest Common Ancestor in a BST

2. **BST Modifications**:
   - Insert into a Binary Search Tree
   - Delete Node in a BST

3. **Tree Traversals**:
   - Binary Tree Inorder Traversal
   - Finding the Kth Smallest Element in a BST
   - Constructing a Binary Tree from Preorder and Inorder Traversal

4. **Level Order Traversal**:
   - Binary Tree Level Order Traversal
   - Binary Tree Right Side View

## Time and Space Complexity

- **BST Operations** (search, insert, delete):
  - Time: O(h) where h is the height of the tree (O(log n) for balanced trees, O(n) worst case)
  - Space: O(h) for recursion stack

- **DFS Traversals**:
  - Time: O(n) where n is the number of nodes
  - Space: O(h) for recursion stack

- **BFS Traversal**:
  - Time: O(n)
  - Space: O(w) where w is the maximum width of the tree

Understanding these tree operations and traversal methods is fundamental for solving many complex problems in computer science and forms the basis for more advanced tree-based data structures.
---

# Backtracking

## Tree Maze (`08 BACKTRACKING/23 Tree Maze/PYTHON CODE.txt`)
```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def canReachLeaf(root):
    if not root or root.val == 0:
        return False
    if not root.left and not root.right:
        return True
    if canReachLeaf(root.left):
        return True
    if canReachLeaf(root.right):
        return True
    return False

def leafPath(root, path):
    if not root or root.val == 0:
        return False
    path.append(root.val)
    if not root.left and not root.right:
        return True
    if leafPath(root.left, path):
        return True
    if leafPath(root.right, path):
        return True
    path.pop()
    return False
```

---

# Heap / Priority Queue

## Push and Pop (`09 HEAP PRIORITY  QUEUE/25 Push and Pop/PYTHON CODE.txt`)
```python
# Min Heap
class Heap:
    def __init__(self):
        self.heap = [0]

    def push(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        # Percolate up
        while i > 1 and self.heap[i] < self.heap[i // 2]:
            tmp = self.heap[i]
            self.heap[i] = self.heap[i // 2]
            self.heap[i // 2] = tmp
            i = i // 2

    def pop(self):
        if len(self.heap) == 1:
            return None
        if len(self.heap) == 2:
            return self.heap.pop()
        res = self.heap[1]   
        # Move last value to root
        self.heap[1] = self.heap.pop()
        i = 1
        # Percolate down
        while 2 * i < len(self.heap):
            if (2 * i + 1 < len(self.heap) and 
            self.heap[2 * i + 1] < self.heap[2 * i] and 
            self.heap[i] > self.heap[2 * i + 1]):
                # Swap right child
                tmp = self.heap[i]
                self.heap[i] = self.heap[2 * i + 1]
                self.heap[2 * i + 1] = tmp
                i = 2 * i + 1
            elif self.heap[i] > self.heap[2 * i]:
                # Swap left child
                tmp = self.heap[i]
                self.heap[i] = self.heap[2 * i]
                self.heap[2 * i] = tmp
                i = 2 * i
            else:
                break
        return res

    def top(self):
        if len(self.heap) > 1:
            return self.heap[1]
        return None

    def heapify(self, arr):
        # 0-th position is moved to the end
        arr.append(arr[0])
        self.heap = arr
        cur = (len(self.heap) - 1) // 2
        while cur > 0:
            # Percolate down
            i = cur
            while 2 * i < len(self.heap):
                if (2 * i + 1 < len(self.heap) and 
                self.heap[2 * i + 1] < self.heap[2 * i] and 
                self.heap[i] > self.heap[2 * i + 1]):
                    # Swap right child
                    tmp = self.heap[i]
                    self.heap[i] = self.heap[2 * i + 1]
                    self.heap[2 * i + 1] = tmp
                    i = 2 * i + 1
                elif self.heap[i] > self.heap[2 * i]:
                    # Swap left child
                    tmp = self.heap[i]
                    self.heap[i] = self.heap[2 * i]
                    self.heap[2 * i] = tmp
                    i = 2 * i
                else:
                    break
            cur -= 1
```

## Heapify (`09 HEAP PRIORITY  QUEUE/26 Heapify/PYTHON CODE.txt`)
```python
import heapq

# Min Heap
class Heap:
    # ... not showing push, pop to save space.
    
    def heapify(self, arr):
        # 0-th position is moved to the end
        arr.append(arr[0])
        self.heap = arr
        cur = (len(self.heap) - 1) // 2
        while cur > 0:
            # Percolate down
            i = cur
            while 2 * i < len(self.heap):
                if (2 * i + 1 < len(self.heap) and 
                self.heap[2 * i + 1] < self.heap[2 * i] and 
                self.heap[i] > self.heap[2 * i + 1]):
                    # Swap right child
                    tmp = self.heap[i]
                    self.heap[i] = self.heap[2 * i + 1]
                    self.heap[2 * i + 1] = tmp
                    i = 2 * i + 1
                elif self.heap[i] > self.heap[2 * i]:
                    # Swap left child
                    tmp = self.heap[i]
                    self.heap[i] = self.heap[2 * i]
                    self.heap[2 * i] = tmp
                    i = 2 * i
                else:
                    break
            cur -= 1
```

---

# Hashing

## Hash Usage (`10 HASHING/27 Hash Usage/PYTHON CODE.txt`)
```python
names = ["alice", "brad", "collin", "brad", "dylan", "kim"]

countMap = {}
for name in names:
    # If countMap does not contain name
    if name not in countMap:
        countMap[name] = 1
    else:
        countMap[name] += 1
```

## Hash Implementation (`10 HASHING/28 Hash Implementation/PYTHON CODE.txt`)
```python
class Pair:
    def __init__(self, key, val):
        self.key = key
        self.val = val

class HashMap:
    def __init__(self):
        self.size = 0
        self.capacity = 2
        self.map = [None, None]
    
    def hash(self, key):
        index = 0
        for c in key:
            index += ord(c)
        return index % self.capacity

    def get(self, key):
        index = self.hash(key)
        while self.map[index] != None:
            if self.map[index].key == key:
                return self.map[index].val
            index += 1
            index = index % self.capacity
        return None

    def put(self, key, val):
        index = self.hash(key)
        while True:
            if self.map[index] == None:
                self.map[index] = Pair(key, val)
                self.size += 1
                if self.size >= self.capacity // 2:
                    self.rehash()
                return
            elif self.map[index].key == key:
                self.map[index].val = val
                return
            index += 1
            index = index % self.capacity
    
    def remove(self, key):
        if not self.get(key):
            return
        index = self.hash(key)
        while True:
            if self.map[index].key == key:
                self.map[index] = None
                self.size -= 1
                return
            index += 1
            index = index % self.capacity

    def rehash(self):
        self.capacity = 2 * self.capacity
        newMap = []
        for i in range(self.capacity):
            newMap.append(None)
        oldMap = self.map
        self.map = newMap
        self.size = 0
        for pair in oldMap:
            if pair:
                self.put(pair.key, pair.val)
    
    def print(self):
        for pair in self.map:
            if pair:
                print(pair.key, pair.val)
```

---

# Graphs

## Matrix DFS (`11 GRAPHS/30 Matrix DFS/PYTHON CODE.txt`)
```python
# Matrix (2D Grid)
grid = [[0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 0]]
## This is used to find the number of unique paths 
# Count paths (backtracking)
def dfs(grid, r, c, visit):
    ROWS, COLS = len(grid), len(grid[0])
    if (min(r, c) < 0 or
        r == ROWS or c == COLS or
        (r, c) in visit or grid[r][c] == 1):
        return 0
    if r == ROWS - 1 and c == COLS - 1:
        return 1
    visit.add((r, c))
    count = 0
    count += dfs(grid, r + 1, c, visit)
    count += dfs(grid, r - 1, c, visit)
    count += dfs(grid, r, c + 1, visit)
    count += dfs(grid, r, c - 1, visit)
    visit.remove((r, c))
    return count
```

## Matrix BFS (`11 GRAPHS/31 Matrix BFS/PYTHON CODE.txt`)
```python
from collections import deque

# Matrix (2D Grid)
grid = [[0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 1, 0, 0]]

# Shortest path from top left to bottom right
def bfs(grid):
    ROWS, COLS = len(grid), len(grid[0])
    visit = set()
    queue = deque()
    queue.append((0, 0))
    visit.add((0, 0))
    length = 0
    while queue:
        for i in range(len(queue)):
            r, c = queue.popleft()
            if r == ROWS - 1 and c == COLS - 1:
                return length
            neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]]
            for dr, dc in neighbors:
                if (min(r + dr, c + dc) < 0 or
                    r + dr == ROWS or c + dc == COLS or
                    (r + dr, c + dc) in visit or grid[r + dr][c + dc] == 1):
                    continue
                queue.append((r + dr, c + dc))
                visit.add((r + dr, c + dc))
        length += 1
```

## Adjacency List (`11 GRAPHS/32 Adjacency List/PYTHON CODE.txt`)
```python
from collections import deque

# GraphNode used for adjacency list
class GraphNode:
    def __init__(self, val):
        self.val = val
        self.neighbors = []

# Or use a HashMap
adjList = { "A": [], "B": [] }

# Given directed edges, build an adjacency list
edges = [["A", "B"], ["B", "C"], ["B", "E"], ["C", "E"], ["E", "D"]]

adjList = {}

for src, dst in edges:
    if src not in adjList:
        adjList[src] = []
    if dst not in adjList:
        adjList[dst] = []
    adjList[src].append(dst)

# Count paths (backtracking)
def dfs(node, target, adjList, visit):
    if node in visit:
        return 0
    if node == target:
        return 1
    count = 0
    visit.add(node)
    for neighbor in adjList[node]:
        count += dfs(neighbor, target, adjList, visit)
    visit.remove(node)
    return count

# Shortest path from node to target
def bfs(node, target, adjList):
    length = 0
    visit = set()
    visit.add(node)
    queue = deque()
    queue.append(node)
    while queue:
        for i in range(len(queue)):
            curr = queue.popleft()
            if curr == target:
                return length
            for neighbor in adjList[curr]:
                if neighbor not in visit:
                    visit.add(neighbor)
                    queue.append(neighbor)
        length += 1
    return length
```

---

# Dynamic Programming

## 1D DP (`12 DYNAMIC PROGRAMMING/33 1-Dimension DP/PYTHON CODE.txt`)
```python
# Brute Force
def bruteForce(n):
    if n <= 1:
        return n
    return bruteForce(n - 1) + bruteForce(n - 2)

# Memoization
def memoization(n, cache):
    if n <= 1:
        return n
    if n in cache:
        return cache[n]
    cache[n] = memoization(n - 1) + memoization(n - 2)
    return cache[n]

# Dynamic Programming
def dp(n):
    if n < 2:
        return n
    dp = [0, 1]
    i = 2
    while i <= n:
        tmp = dp[1]
        dp[1] = dp[0] + dp[1]
        dp[0] = tmp
        i += 1
    return dp[1]
```

## 2D DP (`12 DYNAMIC PROGRAMMING/34 2-Dimension DP/PYTHON CODE.txt`)
```python
# Brute Force - Time: O(2 ^ (n + m)), Space: O(n + m)
def bruteForce(r, c, rows, cols):
    if r == rows or c == cols:
        return 0
    if r == rows - 1 and c == cols - 1:
        return 1
    return (bruteForce(r + 1, c, rows, cols) +  
            bruteForce(r, c + 1, rows, cols))

print(bruteForce(0, 0, 4, 4))

# Memoization - Time and Space: O(n * m)
def memoization(r, c, rows, cols, cache):
    if r == rows or c == cols:
        return 0
    if cache[r][c] > 0:
        return cache[r][c]
    if r == rows - 1 and c == cols - 1:
        return 1
    cache[r][c] = (memoization(r + 1, c, rows, cols, cache) +  
        memoization(r, c + 1, rows, cols, cache))
    return cache[r][c]

print(memoization(0, 0, 4, 4, [[0] * 4 for i in range(4)]))

# Dynamic Programming - Time: O(n * m), Space: O(m), where m is num of cols
def dp(rows, cols):
    prevRow = [0] * cols
    for r in range(rows - 1, -1, -1):
        curRow = [0] * cols
        curRow[cols - 1] = 1
        for c in range(cols - 2, -1, -1):
            curRow[c] = curRow[c + 1] + prevRow[c]
        prevRow = curRow
    return prevRow[0] 
```

---


# Bit Manipulation

## Bit Operator (`13 BIT MANIPULATION/35 BIT OPERATOR/PYTHON CODE.txt`)
```python
# AND
n = 1 & 1

# OR
n = 1 | 0

# XOR  ## 0 is same else different 
n = 0 ^ 1

# NOT (negation)
n = ~n

# Bit shifting
n = 1
n = n << 1  # left shift , *2 (multiply by 2 ), 
n = n >> 1  #right shift , /2 (divide by 2 )

# Counting Bits
def countBits(n):
    count = 0
    while n > 0:
        if n & 1 == 1:
            count += 1
        n = n >> 1 # same as n // 2
    return count
```

---
---

# ADVANCE
---


# 1. Arrays - 0. Kadane's Algo (and Variants)

```python
# Brute Force: O(n^2)
def bruteForce(nums):
    maxSum = nums[0]

    for i in range(len(nums)):
        curSum = 0
        for j in range(i, len(nums)):
            curSum += nums[j]
            maxSum = max(maxSum, curSum)
    return maxSum

# Kadane's Algorithm: O(n)
def kadanes(nums):
    maxSum = nums[0]
    curSum = 0

    for n in nums:
        curSum = max(curSum, 0)
        curSum += n
        maxSum = max(maxSum, curSum)
    return maxSum

# Return the left and right index of the max subarray sum,
# assuming there's exactly one result (no ties).
# Sliding window variation of Kadane's: O(n)
def slidingWindow(nums):
    maxSum = nums[0]
    curSum = 0
    maxL, maxR = 0, 0
    L = 0

    for R in range(len(nums)):
        if curSum < 0:
            curSum = 0
            L = R

        curSum += nums[R]
        if curSum > maxSum:
            maxSum = curSum
            maxL, maxR = L, R 

    return [maxL, maxR]
```

---

# 1. Arrays - 1. Sliding Window Fixed

```python
# Check if array contains a pair of duplicate values,
# where the two duplicates are no farther than k positions from 
# eachother (i.e. arr[i] == arr[j] and abs(i - j) + 1 <= k).
# O(n * k)
def closeDuplicatesBruteForce(nums, k):
    for L in range(len(nums)):
        for R in range(L + 1, min(len(nums), L + k)):
            if nums[L] == nums[R]:
                return True
    return False

# Same problem using sliding window.
# O(n)
def closeDuplicates(nums, k):
    window = set() # Cur window of size <= k
    L = 0

    for R in range(len(nums)):
        if R - L + 1 > k:
            window.remove(nums[L])
            L += 1
        if nums[R] in window:
            return True
        window.add(nums[R])

    return False
```

---

# 1. Arrays - 2. Sliding Window Variable

```python
# Find the length of longest subarray with the same 
# value in each position: O(n)
def longestSubarray(nums):
    length = 0
    L = 0
    
    for R in range(len(nums)):
        if nums[L] != nums[R]:
            L = R 
        length = max(length, R - L + 1)
    return length

# Find length of the minimum size subarray where the sum is 
# greater than or equal to the target.
# Assume all values in the input are positive.
# O(n)
def shortestSubarray(nums, target):
    L, total = 0, 0
    length = float("inf")
    
    for R in range(len(nums)):
        total += nums[R]
        while total >= target:
            length = min(R - L + 1, length)
            total -= nums[L]
            L += 1
    return 0 if length == float("inf") else length
```

---

# 1. Arrays - 3. Two Pointers

```python
# Given a string of characters, return true if it's a palindrome,
# return false otherwise: O(n)
def isPalindrome(word):
    L, R = 0, len(word) - 1
    while L < R:
        if word[L] != word[R]:
            return False
        L += 1
        R -= 1
    return True

# Given a sorted array of integers, return the indices
# of two elements (in different positions) that sum up to
# the target value. Assume there is exactly one solution.
# O(n)
def targetSum(nums, target):
    L, R = 0, len(nums) - 1
    while L < R:
        if nums[L] + nums[R] > target:
            R -= 1
        elif nums[L] + nums[R] < target:
            L += 1
        else:
            return [L, R]
```

---

# 1. Arrays - 4. Prefix Sums

```python
class PrefixSum:

    def __init__(self, nums):
        self.prefix = []
        total = 0
        for n in nums:
            total += n
            self.prefix.append(total)
        
    def rangeSum(self, left, right):
        preRight = self.prefix[right]
        preLeft = self.prefix[left - 1] if left > 0 else 0
        return (preRight - preLeft)
```

---

# 2. Linked Lists - 1. Fast and Slow Pointers

```python
# Find the middle of a linked list with two pointers.
# Time: O(n), Space: O(1)
def middleOfList(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# Determine if the linked list contains a cycle.
# Time: O(n), Space: O(1)
def hasCycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Determine if the linked list contains a cycle and
# return the beginning of the cycle, otherwise return null.
# Time: O(n), Space: O(1)
def cycleStart(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break

    if not fast or not fast.next:
        return None
    
    slow2 = head
    while slow != slow2:
        slow = slow.next
        slow2 = slow2.next
    return slow
```

---

# 3. Tries - 1. Trie
USED IN PLACE OF HASHMAP WHERE THE INSERTETION, SEARCH AND FIND PREFIX IS O(1)
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.word = True

    def search(self, word):
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.word

    def startsWith(self, prefix):
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True
```

---

# 3. Tries - 2. Union Find
To find:Disjoint set,connected components and cycle detection 
```python
class UnionFind:
    def __init__(self, n):
        self.par = {}
        self.rank = {}

        for i in range(1, n + 1):
            self.par[i] = i
            self.rank[i] = 0
    
    # Find parent of n, with path compression.    , used to find the parent 
    def find(self, n):
        p = self.par[n]
        while p != self.par[p]:
            self.par[p] = self.par[self.par[p]]
            p = self.par[p]
        return p

    # Union by height / rank.
    # Return false if already connected, true otherwise.
    def union(self, n1, n2):
        p1, p2 = self.find(n1), self.find(n2)
        if p1 == p2:
            return False
        
        if self.rank[p1] > self.rank[p2]:
            self.par[p2] = p1
        elif self.rank[p1] < self.rank[p2]:
            self.par[p1] = p2
        else:
            self.par[p1] = p2
            self.rank[p2] += 1
        return True
```

# ARRAY TYPE UNION FIND 



```python
class UnionFind:
    def __init__(self, n):
        # parent[i] = parent of node i
        self.par = [i for i in range(n + 1)]
        # rank[i] = rank (approx. tree height) of node i
        self.rank = [0] * (n + 1)

    # Find with path compression
    def find(self, n):
        if self.par[n] != n:
            self.par[n] = self.find(self.par[n])  # path compression
        return self.par[n]

    # Union by rank
    def union(self, n1, n2):
        p1, p2 = self.find(n1), self.find(n2)
        if p1 == p2:
            return False  # already connected

        if self.rank[p1] > self.rank[p2]:
            self.par[p2] = p1
        elif self.rank[p1] < self.rank[p2]:
            self.par[p1] = p2
        else:
            self.par[p1] = p2
            self.rank[p2] += 1

        return True
```


---

# 3. Tries - 3. Segment Tree

```python
class SegmentTree:
    def __init__(self, total, L, R):
        self.sum = total
        self.left = None
        self.right = None
        self.L = L
        self.R = R
        
    # O(n)
    @staticmethod
    def build(nums, L, R):
        if L == R:
            return SegmentTree(nums[L], L, R)

        M = (L + R) // 2
        root = SegmentTree(0, L, R)
        root.left = SegmentTree.build(nums, L, M)
        root.right = SegmentTree.build(nums, M + 1, R)
        root.sum = root.left.sum + root.right.sum
        return root

    # O(logn)
    def update(self, index, val):
        if self.L == self.R:
            self.sum = val
            return
        
        M = (self.L + self.R) // 2
        if index > M:
            self.right.update(index, val)
        else:
            self.left.update(index, val)
        self.sum = self.left.sum + self.right.sum
        
    # O(logn)
    def rangeQuery(self, L, R):
        if L == self.L and R == self.R:
            return self.sum
        
        M = (self.L + self.R) // 2
        if L > M:
            return self.right.rangeQuery(L, R)
        elif R <= M:
            return self.left.rangeQuery(L, R)
        else:
            return (self.left.rangeQuery(L, M) +
                    self.right.rangeQuery(M + 1, R))
```

---

# 3. Tries - 4. Iterative DFS

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val, left, right):
        self.val = val
        self.left = left
        self.right = right

# Time and space: O(n)
def inorder(root):
    stack = []
    curr = root

    while curr or stack:
        if curr:
            stack.append(curr)
            curr = curr.left
        else:
            curr = stack.pop()
            print(curr.val)
            curr = curr.right

# Time and space: O(n)
def preorder(root):
    stack = []
    curr = root
    while curr or stack:
        if curr:
            print(curr.val)
            if curr.right:
                stack.append(curr.right)
            curr = curr.left
        else:
            curr = stack.pop()

# Time and space: O(n)
def postorder(root):
    stack = [root]
    visit = [False]
    while stack:
        curr, visited = stack.pop(), visit.pop()
        if curr:
            if visited:
                print(curr.val)
            else:
                stack.append(curr)
                visit.append(True)
                stack.append(curr.right)
                visit.append(False)
                stack.append(curr.left)
                visit.append(False)
```

---

# 4. Heaps - 1. Heaps

```python
import heapq

class Median:
    def __init__(self):
        self.small, self.large = [], []

    def insert(self, num):
        # Push to the max heap and swap with min heap if needed.
        heapq.heappush(self.small, -1 * num)
        if (self.small and self.large and (-1 * self.small[0]) > self.large[0]):
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        
        # Handle uneven size
        if len(self.small) > len(self.large) + 1:
            val = -1 * heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small) + 1:
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -1 * val)
        
    def getMedian(self):
        if len(self.small) > len(self.large):
            return -1 * self.small[0]
        elif len(self.large) > len(self.small):
            return self.large[0]
        
        # Even # of elements, return avg of two middle nums
        return (-1 * self.small[0] + self.large[0]) / 2
```

---

# 5. Backtracking - 1. Subsets

```python
# Time: O(n * 2^n), Space: O(n)
def subsetsWithoutDuplicates(nums):
    subsets, curSet = [], []
    helper(0, nums, curSet, subsets)
    return subsets

def helper(i, nums, curSet, subsets):
    if i >= len(nums):
        subsets.append(curSet.copy())
        return
    
    # decision to include nums[i]
    curSet.append(nums[i])
    helper(i + 1, nums, curSet, subsets)
    curSet.pop()

    # decision NOT to include nums[i]
    helper(i + 1, nums, curSet, subsets)

# Time: O(n * 2^n), Space: O(n)
def subsetsWithDuplicates(nums):
    nums.sort()
    subsets, curSet = [], []
    helper2(0, nums, curSet, subsets)
    return subsets

def helper2(i, nums, curSet, subsets):
    if i >= len(nums):
        subsets.append(curSet.copy())
        return
    
    # decision to include nums[i]
    curSet.append(nums[i])
    helper2(i + 1, nums, curSet, subsets)
    curSet.pop()

    # decision NOT to include nums[i]
    while i + 1 < len(nums) and nums[i] == nums[i + 1]:
        i += 1
    helper2(i + 1, nums, curSet, subsets)
```

---

# 5. Backtracking - 2. Combinations

```python
# Given n numbers (1 - n), return all possible combinations
# of size k. (n choose k math problem).
# Time: O(k * 2^n)
def combinations(n, k):
    combs = []
    helper(1, [], combs, n, k)
    return combs

def helper(i, curComb, combs, n, k):
    if len(curComb) == k:
        combs.append(curComb.copy())
        return
    if i > n:
        return
    
    # decision to include i
    curComb.append(i)
    helper(i + 1, curComb, combs, n, k)
    curComb.pop()
    
    # decision to NOT include i
    helper(i + 1, curComb, combs, n, k)

# Time: O(k * C(n, k))
def combinations2(n, k):
    combs = []
    helper2(1, [], combs, n, k)
    return combs

def helper2(i, curComb, combs, n, k):
    if len(curComb) == k:
        combs.append(curComb.copy())
        return
    if i > n:
        return
    
    for j in range(i, n + 1):
        curComb.append(j)
        helper2(j + 1, curComb, combs, n, k)
        curComb.pop()
```

---

# 5. Backtracking - 3. Permutation

```python
# Time: O(n^2 * n!)
def permutationsRecursive(nums):
    return helper(0, nums)
        
def helper(i, nums):   
    if i == len(nums):
        return [[]]
    
    resPerms = []
    perms = helper(i + 1, nums)
    for p in perms:
        for j in range(len(p) + 1):
            pCopy = p.copy()
            pCopy.insert(j, nums[i])
            resPerms.append(pCopy)
    return resPerms

# Time: O(n^2 * n!)
def permutationsIterative(nums):
    perms = [[]]

    for n in nums:
        nextPerms = []
        for p in perms:
            for i in range(len(p) + 1):
                pCopy = p.copy()
                pCopy.insert(i, n)
                nextPerms.append(pCopy)
        perms = nextPerms
    return perms
```

---

# 6. Graphs - 1. Dijkstra

```python
import heapq

# Given a connected graph represented by a list of edges, where
# edge[0] = src, edge[1] = dst, and edge[2] = weight,
# find the shortest path from src to every other node in the 
# graph. There are n nodes in the graph.
# O(E * logV), O(E * logE) is also correct.
def shortestPath(edges, n, src):
    adj = {}
    for i in range(1, n + 1):
        adj[i] = []
        
    # s = src, d = dst, w = weight
    for s, d, w in edges:
        adj[s].append([d, w])

    shortest = {}
    minHeap = [[0, src]]
    while minHeap:
        w1, n1 = heapq.heappop(minHeap)
        if n1 in shortest:
            continue
        shortest[n1] = w1

        for n2, w2 in adj[n1]:
            if n2 not in shortest:
                heapq.heappush(minHeap, [w1 + w2, n2])
    return shortest
```

---

# 6. Graphs - 2. Prim's

```python
import heapq

# Given a list of edges of a connected undirected graph,
# with nodes numbered from 1 to n,
# return a list edges making up the minimum spanning tree.
def minimumSpanningTree(edges, n):
    adj = {}
    for i in range(1, n + 1):
        adj[i] = []
    for n1, n2, weight in edges:
        adj[n1].append([n2, weight])
        adj[n2].append([n1, weight])

    # Initialize the heap by choosing a single node
    # (in this case 1) and pushing all its neighbors.
    minHeap = []
    for neighbor, weight in adj[1]:
        heapq.heappush(minHeap, [weight, 1, neighbor])

    mst = []
    visit = set()
    visit.add(1)
    while len(visit) < n:
        weight, n1, n2 = heapq.heappop(minHeap)
        if n2 in visit:
            continue

        mst.append([n1, n2])
        visit.add(n2)
        for neighbor, weight in adj[n2]:
            if neighbor not in visit:
                heapq.heappush(minHeap, [weight, n2, neighbor])
    return mst
```

---

# 6. Graphs - 3. Kruskal's

```python
import heapq 

class UnionFind:
    def __init__(self, n):
        self.par = {}
        self.rank = {}

        for i in range(1, n + 1):
            self.par[i] = i
            self.rank[i] = 0
    
    # Find parent of n, with path compression.
    def find(self, n):
        p = self.par[n]
        while p != self.par[p]:
            self.par[p] = self.par[self.par[p]]
            p = self.par[p]
        return p

    # Union by height / rank.
    # Return false if already connected, true otherwise.
    def union(self, n1, n2):
        p1, p2 = self.find(n1), self.find(n2)
        if p1 == p2:
            return False
        
        if self.rank[p1] > self.rank[p2]:
            self.par[p2] = p1
        elif self.rank[p1] < self.rank[p2]:
            self.par[p1] = p2
        else:
            self.par[p1] = p2
            self.rank[p2] += 1
        return True

# Given an list of edges of a connected undirected graph,
# with nodes numbered from 1 to n,
# return a list edges making up the minimum spanning tree.
def minimumSpanningTree(edges, n):
    minHeap = []
    for n1, n2, weight in edges:
        heapq.heappush(minHeap, [weight, n1, n2])

    unionFind = UnionFind(n)
    mst = []
    while len(mst) < n - 1:
        weight, n1, n2 = heapq.heappop(minHeap)
        if not unionFind.union(n1, n2):
            continue
        mst.append([n1, n2])
    return mst
```

---

# 6. Graphs - 4. Topological Sort

```python
# Given a directed acyclical graph, return a valid
# topological ordering of the graph. 
def topologicalSort(edges, n):
    adj = {}
    for i in range(1, n + 1):
        adj[i] = []
    for src, dst in edges:
        adj[src].append(dst)

    topSort = []
    visit = set()
    for i in range(1, n + 1):
        dfs(i, adj, visit, topSort)
    topSort.reverse()
    return topSort

def dfs(src, adj, visit, topSort):
    if src in visit:
        return
    visit.add(src)
    
    for neighbor in adj[src]:
        dfs(neighbor, adj, visit, topSort)
    topSort.append(src)
```

---

# 7. Dynamic Programming - 1. 0-1 Knapsack

```python
# Brute force Solution
# Time: O(2^n), Space: O(n)
def dfs(profit, weight, capacity):
    return dfsHelper(0, profit, weight, capacity)

def dfsHelper(i, profit, weight, capacity):
    if i == len(profit):
        return 0

    # Skip item i
    maxProfit = dfsHelper(i + 1, profit, weight, capacity)

    # Include item i
    newCap = capacity - weight[i]
    if newCap >= 0:
        p = profit[i] + dfsHelper(i + 1, profit, weight, newCap)
        maxProfit = max(maxProfit, p)

    return maxProfit

# Memoization Solution
# Time: O(n * m), Space: O(n * m)
def memoization(profit, weight, capacity):
    N, M = len(profit), capacity
    cache = [[-1] * (M + 1) for _ in range(N)]
    return memoHelper(0, profit, weight, capacity, cache)

def memoHelper(i, profit, weight, capacity, cache):
    if i == len(profit):
        return 0
    if cache[i][capacity] != -1:
        return cache[i][capacity]

    cache[i][capacity] = memoHelper(i + 1, profit, weight, capacity, cache)
    
    newCap = capacity - weight[i]
    if newCap >= 0:
        p = profit[i] + memoHelper(i + 1, profit, weight, newCap, cache)
        cache[i][capacity] = max(cache[i][capacity], p)

    return cache[i][capacity]

# Dynamic Programming Solution
# Time: O(n * m), Space: O(n * m)
def dp(profit, weight, capacity):
    N, M = len(profit), capacity
    dp = [[0] * (M + 1) for _ in range(N)]

    for i in range(N):
        dp[i][0] = 0
    for c in range(M + 1):
        if weight[0] <= c:
            dp[0][c] = profit[0] 

    for i in range(1, N):
        for c in range(1, M + 1):
            skip = dp[i-1][c]
            include = 0
            if c - weight[i] >= 0:
                include = profit[i] + dp[i-1][c - weight[i]]
            dp[i][c] = max(include, skip)
    return dp[N-1][M]

# Memory optimized Dynamic Programming Solution
# Time: O(n * m), Space: O(m)
def optimizedDp(profit, weight, capacity):
    N, M = len(profit), capacity
    dp = [0] * (M + 1)

    for c in range(M + 1):
        if weight[0] <= c:
            dp[c] = profit[0] 

    for i in range(1, N):
        curRow = [0] * (M + 1)
        for c in range(1, M + 1):
            skip = dp[c]
            include = 0
            if c - weight[i] >= 0:
                include = profit[i] + dp[c - weight[i]]
            curRow[c] = max(include, skip)
        dp = curRow
    return dp[M]
```

---

# 7. Dynamic Programming - 2. Unbounded Knapsack

```python
# Brute force Solution
# Time: O(2^m), Space: O(m)
def dfs(profit, weight, capacity):
    return dfsHelper(0, profit, weight, capacity)

def dfsHelper(i, profit, weight, capacity):
    if i == len(profit):
        return 0

    maxProfit = dfsHelper(i + 1, profit, weight, capacity)

    newCap = capacity - weight[i]
    if newCap >= 0:
        p = profit[i] + dfsHelper(i, profit, weight, newCap)
        maxProfit = max(maxProfit, p)

    return maxProfit

# Memoization Solution
# Time: O(n * m), Space: O(n * m)
def memoization(profit, weight, capacity):
    N, M = len(profit), capacity
    cache = [[-1] * (M + 1) for _ in range(N)]
    return memoHelper(0, profit, weight, capacity, cache)

def memoHelper(i, profit, weight, capacity, cache):
    if i == len(profit):
        return 0
    if cache[i][capacity] != -1:
        return cache[i][capacity]

    cache[i][capacity] = memoHelper(i + 1, profit, weight, capacity, cache)
    
    newCap = capacity - weight[i]
    if newCap >= 0:
        p = profit[i] + memoHelper(i, profit, weight, newCap, cache)
        cache[i][capacity] = max(cache[i][capacity], p)

    return cache[i][capacity]

# Dynamic Programming Solution
# Time: O(n * m), Space: O(n * m)
def dp(profit, weight, capacity):
    N, M = len(profit), capacity
    dp = [[0] * (M + 1) for _ in range(N)]

    for i in range(N):
        dp[i][0] = 0
    for c in range(M + 1):
        if weight[0] <= c:
            dp[0][c] = (c // weight[0]) * profit[0] 

    for i in range(1, N):
        for c in range(1, M + 1):
            skip = dp[i-1][c]
            include = 0
            if c - weight[i] >= 0:
                include = profit[i] + dp[i][c - weight[i]]
            dp[i][c] = max(include, skip)
    return dp[N-1][M]

# Memory optimized Dynamic Programming Solution
# Time: O(n * m), Space: O(m)
def optimizedDp(profit, weight, capacity):
    N, M = len(profit), capacity
    dp = [0] * (M + 1)

    for i in range(N):
        curRow = [0] * (M + 1)
        for c in range(1, M + 1):
            skip = dp[c]
            include = 0
            if c - weight[i] >= 0:
                include = profit[i] + curRow[c - weight[i]]
            curRow[c] = max(include, skip)
        dp = curRow
    return dp[M]
```

---

# 7. Dynamic Programming - 3. LCS (Longest Common Subsequence)

```python
# Time: O(2^(n + m)), Space: O(n + m)
def dfs(s1, s2):
    return dfsHelper(s1, s2, 0, 0)

def dfsHelper(s1, s2, i1, i2):
    if i1 == len(s1) or i2 == len(s2):
        return 0
    
    if s1[i1] == s2[i2]:
        return 1 + dfsHelper(s1, s2, i1 + 1, i2 + 1)
    else:
        return max(dfsHelper(s1, s2, i1 + 1, i2),
                dfsHelper(s1, s2, i1, i2 + 1))

# Time: O(n * m), Space: O(n + m)
def memoization(s1, s2):
    N, M = len(s1), len(s2)
    cache = [[-1] * M for _ in range(N)]
    return memoHelper(s1, s2, 0, 0, cache)

def memoHelper(s1, s2, i1, i2, cache):
    if i1 == len(s1) or i2 == len(s2):
        return 0
    if cache[i1][i2] != -1:
        return cache[i1][i2]

    if s1[i1] == s2[i2]:
        cache[i1][i2] = 1 + memoHelper(s1, s2, i1 + 1, i2 + 1, cache)
    else:
        cache[i1][i2] = max(memoHelper(s1, s2, i1 + 1, i2, cache),
                memoHelper(s1, s2, i1, i2 + 1, cache))
    return cache[i1][i2]

# Time: O(n * m), Space: O(n + m)
def dp(s1, s2):
    N, M = len(s1), len(s2)
    dp = [[0] * (M+1) for _ in range(N+1)]

    for i in range(N):
        for j in range(M):
            if s1[i] == s2[j]:
                dp[i+1][j+1] = 1 + dp[i][j]
            else:
                dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
    return dp[N][M]

# Time: O(n * m), Space: O(m)
def optimizedDp(s1, s2):
    N, M = len(s1), len(s2)
    dp = [0] * (M + 1)

    for i in range(N):
        curRow = [0] * (M + 1)
        for j in range(M):
            if s1[i] == s2[j]:
                curRow[j+1] = 1 + dp[j]
            else:
                curRow[j+1] = max(dp[j + 1], curRow[j])
        dp = curRow
    return dp[M]
```

---

# 7. Dynamic Programming - 4. Palindromes

```python
# Time: O(n^2), Space: O(n)
def longest(s):
    length = 0
    
    for i in range(len(s)):
        # odd length
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > length:
                length = r - l + 1
            l -= 1
            r += 1
        
        # even length
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > length:
                length = r - l + 1
            l -= 1
            r += 1
            
    return length

# Same solution, without duplicate code.
# Time: O(n^2), Space: O(n)
def longest(s):
    length = 0
    for i in range(len(s)):
        # odd length
        length = max(length, helper(s, i, i))
        
        # even length
        length = max(length, helper(s, i, i + 1)) 
    return length

def helper(s, l, r):
    maxLength = 0
    while l >= 0 and r < len(s) and s[l] == s[r]:
        if (r - l + 1) > maxLength:
            maxLength = r - l + 1
        l -= 1
        r += 1
    return maxLength
```

---
