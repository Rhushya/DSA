extra algo might need to learn 

trees:
AVL 
red black 
B tree(B+ and B-)

Graphs 
travel salesmen problem




---
# BackTracking Extra
---


## Full Permutations (all n numbers)

```python
# Time: O(n! * n) - n! permutations, each taking O(n) to copy
def permutations(n):
    perms = []
    helper([], perms, n)
    return perms

def helper(curPerm, perms, n):
    if len(curPerm) == n:
        perms.append(curPerm.copy())
        return
    
    for j in range(1, n + 1):
        if j not in curPerm:  # Check if number is already used
            curPerm.append(j)
            helper(curPerm, perms, n)
            curPerm.pop()
```

## k-Permutations (k numbers from 1 to n)

```python
# Time: O(P(n,k) * k) where P(n,k) = n!/(n-k)!
def permutations_k(n, k):
    perms = []
    helper_k([], perms, n, k)
    return perms

def helper_k(curPerm, perms, n, k):
    if len(curPerm) == k:
        perms.append(curPerm.copy())
        return
        
    for j in range(1, n + 1):
        if j not in curPerm:  # Check if number is already used
            curPerm.append(j)
            helper_k(curPerm, perms, n, k)
            curPerm.pop()
```
## Extra approch from yt 

```python

from typing import List

def combine(n: int, k: int) -> List[List[int]]:
    """
    Generate all combinations (order does NOT matter) of k numbers from [1..n]
    using the binary decision tree approach: at each index, either pick or skip.

    Time: O(C(n, k)) combinations; recursion overhead proportional to n
    Space: O(k) for current solution + O(n) recursion
    """
    res = []
    sol = []
    nums = list(range(1, n + 1))

    def backtrack(i: int) -> None:
        # If we have k elements, record one combination
        if len(sol) == k:
            res.append(sol[:])
            return

        # If we ran out of items, stop
        if i == n:
            return

        # Option 1: don't pick nums[i]
        backtrack(i + 1)

        # Option 2: pick nums[i]
        sol.append(nums[i])
        backtrack(i + 1)
        sol.pop()

    backtrack(0)
    return res


def permute(n: int, k: int) -> List[List[int]]:
    """
    Generate all permutations (order DOES matter) of length k from [1..n]
    using a binary-tree-like approach. The twist: when we "pick", we reset
    the index to 0 to allow picking any remaining element again (in any order).

    Time: O(P(n, k)) where P(n, k) = n! / (n-k)!
    Space: O(k) for current solution + recursion
    """
    res = []
    sol = []
    nums = list(range(1, n + 1))

    def backtrack(i: int) -> None:
        # If we have k elements, record one permutation
        if len(sol) == k:
            res.append(sol[:])
            return

        # If we exhausted indices without reaching k, stop
        if i == n:
            return

        # Option 1: don't pick nums[i] at this depth, move on
        backtrack(i + 1)

        # Option 2: pick nums[i] (if not already used),
        # then reset i to 0 to allow picking any element next
        if nums[i] not in sol:
            sol.append(nums[i])
            backtrack(0)   # reset to allow any index next
            sol.pop()

    backtrack(0)
    return res


def combine_with_loop(n: int, k: int) -> List[List[int]]:
    """
    Generate combinations using the for-loop style:
    - At each level, iterate candidates starting from 'start'
    - Ensures increasing indices -> avoids duplicates automatically

    Time: O(C(n, k))
    Space: O(k) + recursion
    """
    res = []
    sol = []
    nums = list(range(1, n + 1))

    def backtrack(start: int) -> None:
        if len(sol) == k:
            res.append(sol[:])
            return

        # Iterate indices from 'start' to end, ensuring combinations are unique
        for i in range(start, n):
            sol.append(nums[i])
            backtrack(i + 1)  # next choices must start after i
            sol.pop()

    backtrack(0)
    return res


def permute_with_loop(n: int, k: int) -> List[List[int]]:
    """
    Generate permutations using the for-loop style:
    - At each level, iterate through all nums
    - Use 'sol' membership to avoid reusing the same number in the current path
    - Order matters, so we always start from 0 at each depth

    Time: O(P(n, k))
    Space: O(k) + recursion
    """
    res = []
    sol = []
    nums = list(range(1, n + 1))

    def backtrack() -> None:
        if len(sol) == k:
            res.append(sol[:])
            return

        for i in range(n):
            if nums[i] in sol:
                continue
            sol.append(nums[i])
            backtrack()
            sol.pop()

    backtrack()
    return res
```



---
# Linked List Extra 


---

# Trees 


## 🌲 Binary Search Tree (BST) – Basics

In BST:

* Left subtree has **values < node**
* Right subtree has **values > node**

### 1. **BST Node Class**

Same as before:

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
```

---

### 2. **Insert in BST**

```python
def insert(root, key):
    if not root:
        return Node(key)
    if key < root.val:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root
```

---

### 3. **Search in BST**

```python
def search(root, key):
    if not root or root.val == key:
        return root
    if key < root.val:
        return search(root.left, key)
    else:
        return search(root.right, key)
```

---

### 4. **Delete in BST**

```python
def delete(root, key):
    if not root:
        return None
    if key < root.val:
        root.left = delete(root.left, key)
    elif key > root.val:
        root.right = delete(root.right, key)
    else:
        # Found node
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
        # Get inorder successor
        temp = find_min(root.right)
        root.val = temp.val
        root.right = delete(root.right, temp.val)
    return root

def find_min(root):
    while root.left:
        root = root.left
    return root
```

---

## 🧠 LeetCode Tree Problem Patterns

These are **core problem types** you’ll frequently face on LeetCode.

---

### 1. **Recursive DFS Traversal (Inorder/Preorder/Postorder)**

Use when: You need to visit all nodes or do some operation top-down or bottom-up.

```python
def inorder(root):         # Left → Root → Right
    if not root: return
    inorder(root.left)
    print(root.val)
    inorder(root.right)
```

---

### 2. **Iterative BFS / Level Order**

Use when: You need shortest path or level-wise operations.

```python
from collections import deque

def level_order(root):
    if not root: return
    q = deque([root])
    while q:
        node = q.popleft()
        print(node.val)
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)
```

---

### 3. **Max Depth of Tree**

```python
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
```

---

### 4. **Check if Tree is Balanced**

```python
def isBalanced(root):
    def dfs(node):
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    
    return dfs(root) != -1
```

---

### 5. **Lowest Common Ancestor (LCA) in BST**

```python
def lowestCommonAncestor(root, p, q):
    if p.val < root.val and q.val < root.val:
        return lowestCommonAncestor(root.left, p, q)
    elif p.val > root.val and q.val > root.val:
        return lowestCommonAncestor(root.right, p, q)
    else:
        return root
```

---

### 6. **Check if Tree is Symmetric**

```python
def isSymmetric(root):
    def isMirror(t1, t2):
        if not t1 and not t2: return True
        if not t1 or not t2: return False
        return (t1.val == t2.val and 
                isMirror(t1.left, t2.right) and 
                isMirror(t1.right, t2.left))
    
    return isMirror(root, root)
```

---

### 7. **Diameter of Binary Tree**

Max path length between any two nodes.

```python
def diameterOfBinaryTree(root):
    diameter = 0

    def dfs(node):
        nonlocal diameter
        if not node: return 0
        left = dfs(node.left)
        right = dfs(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    
    dfs(root)
    return diameter
```

---
# Graphs 
---

# 0-1 knapsack 

```python
def knapsack_dfs(weights, values, capacity):
    n = len(weights)
    def dfs(index, current_weight, current_value):
        # Base case: no more items or capacity exceeded
        if index == n or current_weight > capacity:
            return 0 if current_weight > capacity else current_value
        
        # Decision 1: Skip current item
        skip = dfs(index + 1, current_weight, current_value)
        
        # Decision 2: Include current item (if it fits)
        take = 0
        if current_weight + weights[index] <= capacity:
            take = dfs(index + 1, current_weight + weights[index], current_value + values[index])
        
        return max(skip, take)
    
    return dfs(0, 0, 0)

# Example usage
weights = [1, 3, 4, 5]
values = [1, 4, 5, 7]
capacity = 7

print(knapsack_dfs(weights, values, capacity))  # Output: 9
```

---
# Unbounded knapsack 

```python
def unbounded_knapsack_dfs(weights, values, capacity):
    n = len(weights)
    def dfs(current_weight, current_value):
        max_value = current_value
        for i in range(n):
            if current_weight + weights[i] <= capacity:
                # Try taking item i again (unbounded)
                max_value = max(max_value, dfs(current_weight + weights[i], current_value + values[i]))
        return max_value

    return dfs(0, 0)

# Example usage
weights = [1, 3, 4, 5]
values = [1, 4, 5, 7]
capacity = 7

print(unbounded_knapsack_dfs(weights, values, capacity))  # Output: 10
```

---




---

##  1. **Cycle Detection in an Undirected Graph (DFS with Parent Tracking)**

```python
def has_cycle_undirected(graph):
    visited = set()

    def dfs(node, parent):
        # Mark the current node as visited
        visited.add(node)

        # Traverse all neighbors of the current node
        for neighbor in graph[node]:
            if neighbor not in visited:
                # Recurse for unvisited neighbor
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                # If the neighbor is visited and is not the parent,
                # then a cycle exists (back edge)
                return True

        return False

    # Check every connected component
    for node in graph:
        if node not in visited:
            if dfs(node, -1):  # Start DFS with parent as -1
                return True

    return False  # No cycles found
```

---

### 🧪 Example usage for undirected graph:

```python
graph = {
    0: [1, 3],
    1: [0, 2],
    2: [1, 3],
    3: [0, 2]
}

print(has_cycle_undirected(graph))  # Output: True
```

---

##  2. **Cycle Detection in a Directed Graph (DFS with Recursion Stack)**

```python
def has_cycle_directed(graph):
    visited = set()      # Tracks all visited nodes
    rec_stack = set()    # Tracks nodes in the current DFS path

    def dfs(node):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor):  # Recurse
                    return True
            elif neighbor in rec_stack:
                # A back edge found, meaning a cycle exists
                return True

        # Backtrack: remove node from recursion stack
        rec_stack.remove(node)
        return False

    # Check every node (for disconnected components)
    for node in graph:
        if node not in visited:
            if dfs(node):
                return True

    return False  # No cycles found
```

---

### 🧪 Example usage for directed graph:

```python
graph = {
    0: [1],
    1: [2],
    2: [3],
    3: [1]  # Cycle here: 1 → 2 → 3 → 1
}

print(has_cycle_directed(graph))  # Output: True
```

---

# Python extras general 
---


```python
list.sort()
sorted(list)

both are same but written in diferent way 

list.index(<what index you want >)
```
---

### Python Sorting with `key` Parameter and Lambda Functions



The `key` function is called **once for each element** and returns a value used for comparison:

```python
# Basic syntax
sorted(iterable, key=function)
list.sort(key=function)

# The key function transforms each element for comparison
# Original: [element1, element2, element3]
# After key: [key(element1), key(key2), key(element3)]
# Then sorted based on these key values
```

## Lambda Functions with Sorting

### Basic Lambda Sorting

```python
# Sort by absolute value
numbers = [-5, 2, -1, 8, -3]
sorted_abs = sorted(numbers, key=lambda x: abs(x))
print(sorted_abs)  # Output: [-1, 2, -3, -5, 8]

# Sort strings by length
words = ["python", "java", "c", "javascript"]
sorted_length = sorted(words, key=lambda x: len(x))
print(sorted_length)  # Output: ['c', 'java', 'python', 'javascript']

# Sort by last character
sorted_last = sorted(words, key=lambda x: x[-1])
print(sorted_last)  # Output: ['java', 'c', 'python', 'javascript']
```

---


# Most used Python library 
```
from functools import cache
from collections import defaultdict , Counter 
from math import random 

and others

```

---

---

## 🔑 1. **`collections` module**

One of the most important for DSA.

### ✅ `Counter`

* Counts frequency of elements quickly.

```python
from collections import Counter

arr = [1,2,2,3,3,3]
cnt = Counter(arr)   # {3:3, 2:2, 1:1}
cnt.most_common(1)   # [(3,3)] → most frequent element
```

---

### ✅ `defaultdict`

* Dictionary with a default value type.
* No `KeyError` on missing keys.

Types you’ll often use:

```python
from collections import defaultdict

graph = defaultdict(list)   # adjacency list
graph[1].append(2)
graph[2].append(3)

freq = defaultdict(int)     # counts
freq["a"] += 1

visited = defaultdict(bool) # visited flags
```

---

### ✅ `deque`

* Double-ended queue. O(1) pops from left.
* Great for BFS, sliding window problems.

```python
from collections import deque

q = deque([1,2,3])
q.append(4)    # right
q.appendleft(0) # left
q.popleft()    # O(1), unlike list pop(0)
```

---

## 🔑 2. **`itertools` module**

### ✅ `permutations`

```python
from itertools import permutations
list(permutations([1,2,3], 2)) 
# [(1,2),(1,3),(2,1),(2,3),(3,1),(3,2)]
```

### ✅ `combinations`

```python
from itertools import combinations
list(combinations([1,2,3], 2)) 
# [(1,2),(1,3),(2,3)]
```

### ✅ `product` (Cartesian product)

```python
from itertools import product
list(product([1,2], [3,4]))  
# [(1,3),(1,4),(2,3),(2,4)]
```

### ✅ `accumulate` (prefix sums)

```python
from itertools import accumulate
list(accumulate([1,2,3,4]))  
# [1,3,6,10]
```

---

## 🔑 3. **`heapq` module**

Min-heaps (priority queues).

```python
import heapq

arr = [5,1,8,3]
heapq.heapify(arr)  # arr becomes min-heap
heapq.heappop(arr)  # pops smallest
heapq.heappush(arr, 0)  # push new element
```

For max-heap, push negative values:

```python
heap = []
heapq.heappush(heap, -5)
```

---

## 🔑 4. **`bisect` module**

Binary search helpers.

```python
import bisect

arr = [1,3,4,7]
bisect.bisect_left(arr, 4)   # 2 (first index of 4)
bisect.bisect_right(arr, 4)  # 3 (after last 4)
```

Great for binary search problems.

---

## 🔑 5. **`functools` module**

### ✅ `lru_cache` / `cache`

Memoization for recursion.

```python
from functools import cache

@cache
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
```

---

## 🔑 6. **`math` module**

Useful math functions.

```python
import math

math.gcd(24, 36)   # 12
math.lcm(4, 6)     # 12
math.factorial(5)  # 120
math.comb(5,2)     # 10 (nCr)
```

---

## 🔑 7. **`random` (sometimes for testing)**

```python
import random
random.choice([1,2,3])  # pick random
```

---

## 🔑 8. **Built-in functions often used in DSA**

* `sum(iterable)` → prefix/sum calculations
* `sorted(iterable, key=...)` → sorting with custom rule
* `enumerate(iterable)` → index + value
* `zip(a,b)` → combine lists
* `map`, `filter`, `any`, `all`

---

✅ **Most common combos on LeetCode**

* **Graph** → `defaultdict(list)`, `deque`
* **Freq / Counting** → `Counter`, `defaultdict(int)`
* **Heap problems** → `heapq`
* **Subsets / Permutations** → `itertools`
* **Binary Search** → `bisect`
* **DP recursion** → `functools.cache`

---

---

### 1. **`i != len(s)`**

* You use this when `i` is an **index** and you want to **stop before going out of bounds**.
* Since the last valid index is `len(s) - 1`, we must stop when `i == len(s)`.

✅ Example: iterating through a string/array

```python
i = 0
while i != len(s):   # same as while i < len(s)
    print(s[i])      # safe, because i is always < len(s)
    i += 1
```

---

### 2. **`i != len(s) - 1`**

* You use this when your code **looks ahead one step (`s[i+1]`)**.
* If `i == len(s) - 1`, then `s[i+1]` would be out of bounds ❌.
* So you stop **one step earlier**.

✅ Example: checking pairs in a string

```python
for i in range(len(s)):
    if i != len(s) - 1 and s[i] == s[i+1]:  # safe because i+1 won’t overflow
        print("pair:", s[i], s[i+1])
```

---

### 3. **`i != len(s) - 2`**

* You use this when your code **looks ahead two steps (`s[i+2]`)**.
* If `i == len(s) - 2` or more, then `s[i+2]` would overflow.
* So you stop **two steps earlier**.

✅ Example: checking triplets in a string

```python
for i in range(len(s)):
    if i != len(s) - 2 and s[i] == s[i+2]:  # safe for i+2
        print("triplet pattern")
```

---

### 4. **`i <= len(s)`**

* Careful! Usually this is ❌ unless you’re using **dummy index math**.
* Because the last valid index is `len(s) - 1`.
* But sometimes it’s used when:

  * You’re counting characters (not indexing),
  * Or using `dp` arrays with size `len(s) + 1` (like in DP problems for substrings).

✅ Example: DP on string (extra row/col for empty prefix)

```python
dp = [[0] * (len(s)+1) for _ in range(len(t)+1)]
for i in range(len(s)+1):   # safe, we made dp size +1
    ...
```

---

### 5. **`i <= len(s) - 1`**

* This is the same as `i < len(s)` or `i != len(s)`.
* You use it in **normal loops** when you want to include the last element.

✅ Example:

```python
i = 0
while i <= len(s) - 1:   # same as while i < len(s)
    print(s[i])
    i += 1
```

---

🔑 **Key Rule to Remember**:

* **Normal traversal → `i < len(s)` (or `i != len(s)`)**
* **When you look ahead `+k` → stop at `len(s) - k`**
* **When using DP with extra row/col → use `<= len(s)`**

---


---
# graphs notion page 
```
https://gossamer-meter-104.notion.site/Graph-Cheatsheet-By-Sid-1a08d36d3d77806bbb0be158a67a907e
```
---
# Cycle Directed and undirected in graphs :+1: 

---

# 🚀 1. Cycle Detection in **Undirected Graph**

👉 In an undirected graph, a cycle exists if **you can return to a vertex without repeating edges, except the first and last vertex being the same**.

There are two classic approaches:

---

## ✅ Method 1: DFS with Parent Tracking

We check if a node is visited again during DFS **and it is not the parent** (to avoid false cycles due to the bidirectional edge).

```python
from collections import defaultdict

class Graph:
    def __init__(self, V):
        self.V = V
        self.graph = defaultdict(list)

    def add_edge(self, u, v):
        self.graph[u].append(v)
        self.graph[v].append(u)  # undirected

    def is_cyclic_util(self, v, visited, parent):
        visited[v] = True
        for neighbor in self.graph[v]:
            if not visited[neighbor]:
                if self.is_cyclic_util(neighbor, visited, v):
                    return True
            elif neighbor != parent:
                return True
        return False

    def is_cyclic(self):
        visited = [False] * self.V
        for i in range(self.V):
            if not visited[i]:
                if self.is_cyclic_util(i, visited, -1):
                    return True
        return False

# Example
g = Graph(5)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 0)  # cycle
print("Undirected Graph Cycle:", g.is_cyclic())  # True
```

---

## ✅ Method 2: Union-Find (Disjoint Set Union, DSU)

We try to join edges; if two vertices already belong to the same set, a cycle exists.

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # cycle
        self.parent[px] = py
        return True

def is_cyclic_undirected(edges, n):
    uf = UnionFind(n)
    for u, v in edges:
        if not uf.union(u, v):
            return True
    return False

# Example
edges = [(0, 1), (1, 2), (2, 0)]  # cycle
print("Undirected Graph Cycle:", is_cyclic_undirected(edges, 3))  # True
```

---

# 🚀 2. Cycle Detection in **Directed Graph**

👉 In directed graphs, a cycle exists if **a vertex is visited again in the same DFS path (recursion stack)**.
Simply revisiting a visited node is not enough (that could be a different path).

---

## ✅ Method 1: DFS + Recursion Stack

We maintain:

* `visited[v]`: if a node has been visited at all
* `recStack[v]`: if a node is in the **current DFS path**

```python
from collections import defaultdict

class DirectedGraph:
    def __init__(self, V):
        self.V = V
        self.graph = defaultdict(list)

    def add_edge(self, u, v):
        self.graph[u].append(v)

    def is_cyclic_util(self, v, visited, recStack):
        visited[v] = True
        recStack[v] = True

        for neighbor in self.graph[v]:
            if not visited[neighbor]:
                if self.is_cyclic_util(neighbor, visited, recStack):
                    return True
            elif recStack[neighbor]:
                return True  # back edge → cycle

        recStack[v] = False
        return False

    def is_cyclic(self):
        visited = [False] * self.V
        recStack = [False] * self.V
        for node in range(self.V):
            if not visited[node]:
                if self.is_cyclic_util(node, visited, recStack):
                    return True
        return False

# Example
g = DirectedGraph(4)
g.add_edge(0, 1)
g.add_edge(1, 2)
g.add_edge(2, 0)  # cycle
print("Directed Graph Cycle:", g.is_cyclic())  # True
```

---

## ✅ Method 2: Kahn’s Algorithm (Topological Sort)

If a graph has a cycle, **we cannot get a valid topological ordering** (some nodes will always have non-zero in-degree).

```python
from collections import deque, defaultdict

def is_cyclic_directed_kahn(V, edges):
    graph = defaultdict(list)
    indegree = [0] * V

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    q = deque([i for i in range(V) if indegree[i] == 0])
    count = 0

    while q:
        node = q.popleft()
        count += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)

    return count != V  # if not all nodes processed → cycle

# Example
edges = [(0,1), (1,2), (2,0)]
print("Directed Graph Cycle (Kahn):", is_cyclic_directed_kahn(3, edges))  # True
```

---

# 🔑 Summary of Methods

| Graph Type     | Method                       | Complexity |
| -------------- | ---------------------------- | ---------- |
| **Undirected** | DFS with parent tracking     | O(V+E)     |
|                | Union-Find (DSU)             | O(E α(V))  |
| **Directed**   | DFS with recursion stack     | O(V+E)     |
|                | Kahn’s Algorithm (Topo sort) | O(V+E)     |

---

👉 Variations covered:

* **Undirected**: DFS, Union-Find
* **Directed**: DFS (recStack), BFS (Kahn’s Topological sort)
---

# ✅ Method 1: **DFS-based Topological Sort**

We push nodes onto a stack **after exploring all their neighbors** (post-order).

```python
from collections import defaultdict

class Graph:
    def __init__(self, V):
        self.V = V
        self.graph = defaultdict(list)

    def add_edge(self, u, v):
        self.graph[u].append(v)

    def topo_sort_dfs_util(self, v, visited, stack):
        visited[v] = True
        for neighbor in self.graph[v]:
            if not visited[neighbor]:
                self.topo_sort_dfs_util(neighbor, visited, stack)
        stack.append(v)  # push after visiting all children

    def topo_sort_dfs(self):
        visited = [False] * self.V
        stack = []
        for i in range(self.V):
            if not visited[i]:
                self.topo_sort_dfs_util(i, visited, stack)
        return stack[::-1]  # reverse gives correct order

# Example
g = Graph(6)
g.add_edge(5, 2)
g.add_edge(5, 0)
g.add_edge(4, 0)
g.add_edge(4, 1)
g.add_edge(2, 3)
g.add_edge(3, 1)

print("Topological Sort (DFS):", g.topo_sort_dfs())
# Possible Output: [5, 4, 2, 3, 1, 0]
```

---

# ✅ Method 2: **Kahn’s Algorithm (BFS)**

We use **in-degree (number of incoming edges)**:

1. Put all nodes with `indegree = 0` into a queue.
2. Repeatedly pop from queue, add to order, and decrease indegree of neighbors.
3. If some nodes remain unprocessed → cycle exists.

```python
from collections import defaultdict, deque

def topo_sort_kahn(V, edges):
    graph = defaultdict(list)
    indegree = [0] * V

    # Build graph + indegree
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    # Start with all 0-indegree nodes
    q = deque([i for i in range(V) if indegree[i] == 0])
    topo_order = []

    while q:
        node = q.popleft()
        topo_order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)

    if len(topo_order) != V:
        return "Cycle detected → no topo sort"
    return topo_order

# Example
edges = [(5,2), (5,0), (4,0), (4,1), (2,3), (3,1)]
print("Topological Sort (Kahn):", topo_sort_kahn(6, edges))
# Possible Output: [4, 5, 2, 3, 1, 0]
```

---

# 🔑 Key Points

* **DFS method** → uses recursion & stack (post-order).
* **Kahn’s Algorithm** → uses in-degree & BFS queue.
* If graph has a cycle → **no valid topo order exists**.

---





# Extra graph algo :+1: 

# 1. **Floyd–Warshall Algorithm**

### Idea:

* It’s a **Dynamic Programming** algorithm.
* Used to find the **shortest path between all pairs of vertices** in a weighted graph.
* Works with **negative edges** (but not negative cycles).
* Time complexity: **O(V³)**, where `V` = number of vertices.

### How it works:

* Start with a `dist` matrix = adjacency matrix of the graph.
* Iteratively try to **improve distances** by checking if going through an intermediate vertex `k` gives a shorter path.
* Formula:

  ```
  dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
  ```

### Example:

Graph:

```
    0 → 1 (weight 3)
    0 → 2 (weight INF)
    1 → 2 (weight 1)
    2 → 0 (weight 2)
```

Initial matrix (INF = no edge):

```
   0   3   INF
   INF 0   1
   2   INF 0
```

After applying Floyd-Warshall:

```
   0   3   4
   3   0   1
   2   5   0
```

So shortest path between every pair is found.

### Python Code:

```python
def floyd_warshall(graph):
    V = len(graph)
    dist = [row[:] for row in graph]  # copy
    
    for k in range(V):
        for i in range(V):
            for j in range(V):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist


INF = float('inf')
graph = [
    [0,   3,   INF],
    [INF, 0,   1],
    [2,   INF, 0]
]

result = floyd_warshall(graph)
for row in result:
    print(row)
```

---

# 2. **Bellman–Ford Algorithm**

### Idea:

* Used to find **shortest path from a single source** to all vertices.
* Works with **negative edge weights** and also detects **negative cycles**.
* Time complexity: **O(V × E)**, where `V` = vertices, `E` = edges.

### How it works:

1. Initialize distance array with `dist[src] = 0`, others = ∞.
2. Relax all edges `V-1` times:
   For each edge `(u, v, w)`:

   ```
   if dist[u] + w < dist[v]:
       dist[v] = dist[u] + w
   ```
3. Run one more iteration to check for **negative cycles**. If distances still improve → cycle exists.

### Example:

Graph edges:

```
0 → 1 (4)
0 → 2 (5)
1 → 2 (-3)
2 → 3 (4)
3 → 1 (6)
```

* Start from `src = 0`.
* After Bellman-Ford:

```
dist = [0, 4, 1, 5]
```

### Python Code:

```python
def bellman_ford(edges, V, src):
    dist = [float('inf')] * V
    dist[src] = 0

    # Relax edges V-1 times
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            print("Graph contains negative weight cycle")
            return None

    return dist


# Graph: (u, v, w)
edges = [
    (0, 1, 4),
    (0, 2, 5),
    (1, 2, -3),
    (2, 3, 4),
    (3, 1, 6)
]

print(bellman_ford(edges, 4, 0))
```

---

✅ **Key difference**:

* **Floyd–Warshall** → all-pairs shortest paths, dense graphs, O(V³).
* **Bellman–Ford** → single-source shortest path, handles negative weights, O(V×E).

---

# 🔹 **Dijkstra’s Algorithm**

* **Goal**: Shortest path from a single source → all vertices.
* **Works with**: Only **non-negative edge weights**.
* **Time Complexity**:

  * With simple array: O(V²)
  * With min-heap/priority queue: O((V + E) log V)
* **Approach**: Greedy (always picks the nearest unvisited node).

---

# 🔹 **Bellman–Ford Algorithm**

* **Goal**: Shortest path from a single source → all vertices.
* **Works with**: **Negative edge weights** and can detect **negative cycles**.
* **Time Complexity**: O(V × E) → slower than Dijkstra.
* **Approach**: Dynamic Programming (relaxes edges repeatedly).

---

# 🔹 **Floyd–Warshall Algorithm**

* **Goal**: Shortest paths between **all pairs of vertices**.
* **Works with**: Negative edges, but **no negative cycles**.
* **Time Complexity**: O(V³).
* **Approach**: Dynamic Programming (updates adjacency matrix with intermediate vertices).

---

# 📊 **Comparison Table**

| Algorithm          | Single-source or All-pairs? | Handles Negative Weights? | Detects Negative Cycles?     | Complexity   | Typical Use                                  |
| ------------------ | --------------------------- | ------------------------- | ---------------------------- | ------------ | -------------------------------------------- |
| **Dijkstra**       | Single-source               | ❌ No (only non-negative)  | ❌ No                         | O((V+E)logV) | Road networks, routing                       |
| **Bellman–Ford**   | Single-source               | ✅ Yes                     | ✅ Yes                        | O(V×E)       | Finance (arbitrage), graphs with negatives   |
| **Floyd–Warshall** | All-pairs                   | ✅ Yes                     | ❌ No (but breaks if present) | O(V³)        | Dense graphs, APSP (all pairs shortest path) |

---

# 🧠 How They’re Related

1. **All solve shortest path problems** but under different constraints.

   * Dijkstra = fast but limited (no negatives).
   * Bellman–Ford = slower, but more general.
   * Floyd–Warshall = solves the *most general case* (all pairs).

2. **Bellman–Ford vs Dijkstra**:

   * Both → single source shortest path.
   * Dijkstra is faster but limited to non-negative edges.
   * Bellman–Ford is slower but works with negatives.

3. **Floyd–Warshall vs Bellman–Ford**:

   * Bellman–Ford runs **from one source**.
   * To get **all-pairs shortest paths** with Bellman–Ford, you’d need to run it **V times** (once from each source). That would be **O(V² × E)** → worse than Floyd–Warshall’s **O(V³)** for dense graphs.

---

👉 In practice:

* If graph is **small/dense and need all-pairs shortest paths** → **Floyd–Warshall**.
* If graph has **negative edges but no negative cycles** → **Bellman–Ford**.
* If graph has **no negative edges and is large/sparse** → **Dijkstra**.

---


# 🌳 **Tree Algorithms**



## 1. **AVL Tree**

* A **self-balancing Binary Search Tree (BST)**.
* Maintains **balance factor = height(left) – height(right)** ∈ {–1, 0, 1}.
* Ensures O(log N) insertion, deletion, and search.
* Uses **rotations** (LL, RR, LR, RL) to stay balanced.

### Python Implementation:

```python
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def insert(self, root, key):
        if not root:
            return Node(key)
        elif key < root.key:
            root.left = self.insert(root.left, key)
        else:
            root.right = self.insert(root.right, key)

        root.height = 1 + max(self.getHeight(root.left),
                              self.getHeight(root.right))
        
        balance = self.getBalance(root)

        # Left Left
        if balance > 1 and key < root.left.key:
            return self.rightRotate(root)

        # Right Right
        if balance < -1 and key > root.right.key:
            return self.leftRotate(root)

        # Left Right
        if balance > 1 and key > root.left.key:
            root.left = self.leftRotate(root.left)
            return self.rightRotate(root)

        # Right Left
        if balance < -1 and key < root.right.key:
            root.right = self.rightRotate(root.right)
            return self.leftRotate(root)

        return root

    def leftRotate(self, z):
        y = z.right
        T2 = y.left
        y.left = z
        z.right = T2
        z.height = 1 + max(self.getHeight(z.left), self.getHeight(z.right))
        y.height = 1 + max(self.getHeight(y.left), self.getHeight(y.right))
        return y

    def rightRotate(self, z):
        y = z.left
        T3 = y.right
        y.right = z
        z.left = T3
        z.height = 1 + max(self.getHeight(z.left), self.getHeight(z.right))
        y.height = 1 + max(self.getHeight(y.left), self.getHeight(y.right))
        return y

    def getHeight(self, root):
        return root.height if root else 0

    def getBalance(self, root):
        return self.getHeight(root.left) - self.getHeight(root.right) if root else 0


# Example Usage
tree = AVLTree()
root = None
for key in [10, 20, 30, 40, 50, 25]:
    root = tree.insert(root, key)
print("AVL Tree balanced insertions done.")
```

---

## 2. **Red–Black Tree**

* Another **self-balancing BST**.
* Each node is either **Red or Black**.
* Rules ensure balance:

  * Root is always black.
  * No two red nodes in a row.
  * Every path from root to null has same # of black nodes.
* Complexity: O(log N).
* Used in **sets, maps in C++ STL, Java TreeMap**.

👉 Full implementation is quite long. In Python, we usually use libraries like `bintrees` or simulate. Do you want me to write **full Red-Black Tree code**, or just a simplified insert with coloring?

---

## 3. **B-Tree (and B+ Tree)**

* A **multi-way search tree** (not binary).
* Used in **databases and filesystems**.
* Each node can have **multiple keys & children**.
* B+ Tree → stores all values in **leaf nodes**, internal nodes only store keys (better for range queries).

### Simplified B-Tree in Python:

```python
class BTreeNode:
    def __init__(self, t, leaf=False):
        self.t = t  # minimum degree
        self.keys = []
        self.children = []
        self.leaf = leaf

class BTree:
    def __init__(self, t):
        self.root = BTreeNode(t, True)

    def traverse(self, node=None):
        if node is None:
            node = self.root
        for i, key in enumerate(node.keys):
            if not node.leaf:
                self.traverse(node.children[i])
            print(key, end=" ")
        if not node.leaf:
            self.traverse(node.children[len(node.keys)])

    # Insert code is long; real DB engines use optimized versions.
```

👉 Implementing **full B+ Tree** is heavy; for interviews, you just need the **concepts and operations (search, insert, split nodes)**.

---

# 🌐 **Graph Algorithms**

---

## 4. **Traveling Salesman Problem (TSP)**

* Goal: Visit all cities exactly once and return to start with **minimum cost**.
* NP-hard problem.
* Approaches:

  * Brute Force → O(N!)
  * Dynamic Programming (Held-Karp) → O(N²·2^N)

### Python (DP Bitmasking):

```python
from functools import lru_cache

def tsp(dist):
    n = len(dist)

    @lru_cache(None)
    def dp(mask, pos):
        if mask == (1 << n) - 1:
            return dist[pos][0]  # return to start
        ans = float('inf')
        for city in range(n):
            if not mask & (1 << city):
                ans = min(ans, dist[pos][city] + dp(mask | (1 << city), city))
        return ans

    return dp(1, 0)  # start at city 0

# Example
dist = [
    [0, 20, 42, 35],
    [20, 0, 30, 34],
    [42, 30, 0, 12],
    [35, 34, 12, 0]
]
print("TSP Min Cost:", tsp(dist))
```

---

## 5. **Kahn’s Algorithm (Topological Sort using BFS)**

* Works on **Directed Acyclic Graphs (DAGs)**.
* Uses **in-degree** array + **queue**.
* Steps:

  1. Find nodes with in-degree = 0, push to queue.
  2. Pop node, add to result, reduce in-degree of neighbors.
  3. Repeat until done.

### Python Code:

```python
from collections import deque, defaultdict

def kahn_topological_sort(V, edges):
    indegree = [0] * V
    adj = defaultdict(list)

    for u, v in edges:
        adj[u].append(v)
        indegree[v] += 1

    q = deque([i for i in range(V) if indegree[i] == 0])
    topo = []

    while q:
        u = q.popleft()
        topo.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)

    if len(topo) == V:
        return topo
    else:
        return "Cycle detected → Not a DAG"

# Example
edges = [(5, 2), (5, 0), (4, 0), (4, 1), (2, 3), (3, 1)]
print("Topological Sort:", kahn_topological_sort(6, edges))
```

---

# ✅ Summary

* **AVL Tree** → Self-balancing BST (rotations).
* **Red-Black Tree** → Balanced BST using colors.
* **B-Tree / B+ Tree** → Used in databases, multi-key nodes.
* **TSP** → NP-hard, solved via DP bitmask.
* **Kahn’s Algorithm** → Topological sort (DAG).


---

# 🔴 Red-Black Tree (RBT)

Key ideas:

* Each node is **RED** or **BLACK**.
* Root is BLACK; leaves (NIL sentinels) are BLACK.
* No two consecutive REDs on any path.
* Every path from a node to its descendant NILs has the same number of BLACK nodes.
* Operations: BST insert/delete + **fixups** (rotations & recolors) to restore invariants.

Below is a compact, correct implementation using a single shared `NIL` sentinel. It supports: `insert`, `delete`, `search`, `inorder`.

```python
class RBNode:
    __slots__ = ("key", "color", "left", "right", "parent")
    def __init__(self, key=None, color="BLACK", left=None, right=None, parent=None):
        self.key = key
        self.color = color
        self.left = left
        self.right = right
        self.parent = parent

class RedBlackTree:
    def __init__(self):
        self.NIL = RBNode()            # sentinel leaf (BLACK)
        self.root = self.NIL

    # ---------- Utility ----------
    def _left_rotate(self, x):
        y = x.right
        x.right = y.left
        if y.left is not self.NIL:
            y.left.parent = x
        y.parent = x.parent
        if x.parent is None:           # x was root
            self.root = y
        elif x is x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y

    def _right_rotate(self, y):
        x = y.left
        y.left = x.right
        if x.right is not self.NIL:
            x.right.parent = y
        x.parent = y.parent
        if y.parent is None:
            self.root = x
        elif y is y.parent.right:
            y.parent.right = x
        else:
            y.parent.left = x
        x.right = y
        y.parent = x

    def search(self, key):
        cur = self.root
        while cur is not self.NIL and cur.key != key:
            cur = cur.left if key < cur.key else cur.right
        return None if cur is self.NIL else cur

    def inorder(self, node=None, out=None):
        if node is None:
            node, out = self.root, []
        if node is self.NIL:
            return out
        self.inorder(node.left, out)
        out.append((node.key, node.color))
        self.inorder(node.right, out)
        return out

    # ---------- Insert ----------
    def insert(self, key):
        node = RBNode(key=key, color="RED", left=self.NIL, right=self.NIL)
        y = None
        x = self.root
        while x is not self.NIL:
            y = x
            x = x.left if node.key < x.key else x.right
        node.parent = y
        if y is None:
            self.root = node
        elif node.key < y.key:
            y.left = node
        else:
            y.right = node
        self._insert_fixup(node)

    def _insert_fixup(self, z):
        while z.parent and z.parent.color == "RED":
            if z.parent is z.parent.parent.left:
                y = z.parent.parent.right  # uncle
                if y.color == "RED":  # case 1
                    z.parent.color = "BLACK"
                    y.color = "BLACK"
                    z.parent.parent.color = "RED"
                    z = z.parent.parent
                else:
                    if z is z.parent.right:  # case 2
                        z = z.parent
                        self._left_rotate(z)
                    # case 3
                    z.parent.color = "BLACK"
                    z.parent.parent.color = "RED"
                    self._right_rotate(z.parent.parent)
            else:
                y = z.parent.parent.left
                if y.color == "RED":
                    z.parent.color = "BLACK"
                    y.color = "BLACK"
                    z.parent.parent.color = "RED"
                    z = z.parent.parent
                else:
                    if z is z.parent.left:
                        z = z.parent
                        self._right_rotate(z)
                    z.parent.color = "BLACK"
                    z.parent.parent.color = "RED"
                    self._left_rotate(z.parent.parent)
        self.root.color = "BLACK"

    # ---------- Delete ----------
    def _transplant(self, u, v):
        if u.parent is None:
            self.root = v
        elif u is u.parent.left:
            u.parent.left = v
        else:
            u.parent.right = v
        v.parent = u.parent

    def _minimum(self, x):
        while x.left is not self.NIL:
            x = x.left
        return x

    def delete(self, key):
        z = self.search(key)
        if z is None:
            return False
        y = z
        y_original_color = y.color
        if z.left is self.NIL:
            x = z.right
            self._transplant(z, z.right)
        elif z.right is self.NIL:
            x = z.left
            self._transplant(z, z.left)
        else:
            y = self._minimum(z.right)
            y_original_color = y.color
            x = y.right
            if y.parent is z:
                x.parent = y
            else:
                self._transplant(y, y.right)
                y.right = z.right
                y.right.parent = y
            self._transplant(z, y)
            y.left = z.left
            y.left.parent = y
            y.color = z.color
        if y_original_color == "BLACK":
            self._delete_fixup(x)
        return True

    def _delete_fixup(self, x):
        while x is not self.root and x.color == "BLACK":
            if x is x.parent.left:
                w = x.parent.right
                if w.color == "RED":
                    w.color = "BLACK"
                    x.parent.color = "RED"
                    self._left_rotate(x.parent)
                    w = x.parent.right
                if w.left.color == "BLACK" and w.right.color == "BLACK":
                    w.color = "RED"
                    x = x.parent
                else:
                    if w.right.color == "BLACK":
                        w.left.color = "BLACK"
                        w.color = "RED"
                        self._right_rotate(w)
                        w = x.parent.right
                    w.color = x.parent.color
                    x.parent.color = "BLACK"
                    w.right.color = "BLACK"
                    self._left_rotate(x.parent)
                    x = self.root
            else:
                w = x.parent.left
                if w.color == "RED":
                    w.color = "BLACK"
                    x.parent.color = "RED"
                    self._right_rotate(x.parent)
                    w = x.parent.left
                if w.right.color == "BLACK" and w.left.color == "BLACK":
                    w.color = "RED"
                    x = x.parent
                else:
                    if w.left.color == "BLACK":
                        w.right.color = "BLACK"
                        w.color = "RED"
                        self._left_rotate(w)
                        w = x.parent.left
                    w.color = x.parent.color
                    x.parent.color = "BLACK"
                    w.left.color = "BLACK"
                    self._right_rotate(x.parent)
                    x = self.root
        x.color = "BLACK"

# --- quick demo ---
if __name__ == "__main__":
    rbt = RedBlackTree()
    for k in [7,3,18,10,22,8,11,26,2,6,13]:
        rbt.insert(k)
    # delete a couple
    rbt.delete(18)
    rbt.delete(11)
    print("RBT inorder (key,color):", rbt.inorder())
```

**What to notice**: insert/delete are standard BST ops followed by fixups. Rotations and recoloring keep the invariants.

---

# 🟦 B-Tree (B-) — balanced multiway search tree

Parameters:

* **Minimum degree `t` (t ≥ 2)**.
* Each node has `t-1 … 2t-1` keys (except root), and `t … 2t` children.
* All leaves at the same depth.
* Great for disks/DBs: large branching factor, few levels.

We’ll implement **search**, **insert** (with node splitting), and **traverse**. (Deletion is possible but long; happy to add if you want it too.)

```python
class BTreeNode:
    def __init__(self, t, leaf=False):
        self.t = t
        self.leaf = leaf
        self.keys = []          # sorted
        self.children = []      # len = len(keys)+1 when internal

    def __repr__(self):
        return f"BTreeNode(leaf={self.leaf}, keys={self.keys})"

class BTree:
    def __init__(self, t=3):
        if t < 2: raise ValueError("t must be >= 2")
        self.t = t
        self.root = BTreeNode(t, leaf=True)

    def search(self, k, x=None):
        x = self.root if x is None else x
        i = 0
        while i < len(x.keys) and k > x.keys[i]:
            i += 1
        if i < len(x.keys) and k == x.keys[i]:
            return x, i
        if x.leaf:
            return None
        return self.search(k, x.children[i])

    def traverse(self, x=None, out=None):
        x = self.root if x is None else x
        out = [] if out is None else out
        i = 0
        for i in range(len(x.keys)):
            if not x.leaf:
                self.traverse(x.children[i], out)
            out.append(x.keys[i])
        if not x.leaf:
            self.traverse(x.children[i+1], out)
        return out

    # -------- insertion helpers --------
    def _split_child(self, x, i):
        t = self.t
        y = x.children[i]             # full child
        z = BTreeNode(t, leaf=y.leaf) # new node
        # move top half of y.keys to z
        z.keys = y.keys[t:]           # t .. 2t-2
        mid = y.keys[t-1]
        y.keys = y.keys[:t-1]
        if not y.leaf:
            z.children = y.children[t:]    # t .. 2t-1
            y.children = y.children[:t]
        # insert z into x
        x.children.insert(i+1, z)
        x.keys.insert(i, mid)

    def _insert_nonfull(self, x, k):
        i = len(x.keys) - 1
        if x.leaf:
            x.keys.append(None)
            while i >= 0 and k < x.keys[i]:
                x.keys[i+1] = x.keys[i]
                i -= 1
            x.keys[i+1] = k
        else:
            while i >= 0 and k < x.keys[i]:
                i -= 1
            i += 1
            if len(x.children[i].keys) == 2*self.t - 1:
                self._split_child(x, i)
                if k > x.keys[i]:
                    i += 1
            self._insert_nonfull(x.children[i], k)

    def insert(self, k):
        r = self.root
        if len(r.keys) == 2*self.t - 1:
            s = BTreeNode(self.t, leaf=False)
            s.children.append(r)
            self.root = s
            self._split_child(s, 0)
            self._insert_nonfull(s, k)
        else:
            self._insert_nonfull(r, k)

# --- quick demo ---
if __name__ == "__main__":
    bt = BTree(t=3)  # order up to 5 children
    for k in [10,20,5,6,12,30,7,17,3,4,50,60,1,2,8,9,11,13,14,15]:
        bt.insert(k)
    print("BTree traverse:", bt.traverse())
    print("Search 14:", bt.search(14))
    print("Search 99:", bt.search(99))
```

**What to notice**: inserts go into a **non-full** node; if a child is full, we **split** it first, pushing the median up.

---

# 🟩 B+ Tree — all values in leaves, great for range scans

Differences vs B-Tree:

* **All actual (key,value) records live in leaves**; internal nodes only guide the search (store keys).
* Leaves are linked as a **doubly-linked list** for fast range queries.
* Here we’ll make a small educational implementation:

  * Order `m` (max keys per node) for simplicity (not tuned for IO pages).
  * Supports `insert(key, value)`, `search(key)`, and `range_search(lo, hi)`.

```python
class BPlusLeaf:
    def __init__(self, m):
        self.m = m
        self.keys = []
        self.vals = []
        self.next = None
        self.prev = None
        self.parent = None
        self.is_leaf = True

class BPlusInternal:
    def __init__(self, m):
        self.m = m
        self.keys = []
        self.children = []
        self.parent = None
        self.is_leaf = False

class BPlusTree:
    def __init__(self, m=4):
        if m < 3: raise ValueError("order m must be >= 3")
        self.m = m
        self.root = BPlusLeaf(m)

    def _find_leaf(self, key):
        x = self.root
        while not x.is_leaf:
            i = 0
            while i < len(x.keys) and key >= x.keys[i]:
                i += 1
            x = x.children[i]
        return x

    def search(self, key):
        leaf = self._find_leaf(key)
        for i, k in enumerate(leaf.keys):
            if k == key:
                return leaf.vals[i]
        return None

    def range_search(self, lo, hi):
        # find start leaf
        leaf = self._find_leaf(lo)
        out = []
        while leaf:
            for k, v in zip(leaf.keys, leaf.vals):
                if k > hi:
                    return out
                if lo <= k <= hi:
                    out.append((k, v))
            leaf = leaf.next
        return out

    def insert(self, key, value):
        leaf = self._find_leaf(key)
        # insert into leaf (sorted)
        i = 0
        while i < len(leaf.keys) and key > leaf.keys[i]:
            i += 1
        if i < len(leaf.keys) and leaf.keys[i] == key:
            leaf.vals[i] = value  # upsert
            return
        leaf.keys.insert(i, key)
        leaf.vals.insert(i, value)

        if len(leaf.keys) > self.m:  # split leaf
            self._split_leaf(leaf)

    def _split_leaf(self, leaf):
        mid = (len(leaf.keys) + 1) // 2
        new_leaf = BPlusLeaf(self.m)
        new_leaf.keys = leaf.keys[mid:]
        new_leaf.vals = leaf.vals[mid:]
        leaf.keys = leaf.keys[:mid]
        leaf.vals = leaf.vals[:mid]

        # link leaves
        new_leaf.next = leaf.next
        if new_leaf.next:
            new_leaf.next.prev = new_leaf
        leaf.next = new_leaf
        new_leaf.prev = leaf

        # push separator to parent
        sep = new_leaf.keys[0]
        if leaf.parent is None:
            new_root = BPlusInternal(self.m)
            new_root.keys = [sep]
            new_root.children = [leaf, new_leaf]
            leaf.parent = new_leaf.parent = new_root
            self.root = new_root
        else:
            self._insert_in_parent(leaf, sep, new_leaf)

    def _insert_in_parent(self, left, key, right):
        parent = left.parent
        # find position to insert key/child
        i = 0
        while i < len(parent.children) and parent.children[i] is not left:
            i += 1
        parent.keys.insert(i, key)
        parent.children.insert(i+1, right)
        right.parent = parent

        if len(parent.keys) > self.m:
            self._split_internal(parent)

    def _split_internal(self, node):
        mid = len(node.keys)//2
        sep_key = node.keys[mid]

        right = BPlusInternal(self.m)
        right.keys = node.keys[mid+1:]
        right.children = node.children[mid+1:]
        for c in right.children:
            c.parent = right

        node.keys = node.keys[:mid]
        node.children = node.children[:mid+1]

        if node.parent is None:
            new_root = BPlusInternal(self.m)
            new_root.keys = [sep_key]
            new_root.children = [node, right]
            node.parent = right.parent = new_root
            self.root = new_root
        else:
            self._insert_in_parent(node, sep_key, right)

# --- quick demo ---
if __name__ == "__main__":
    bpt = BPlusTree(m=4)
    data = [(5,"e"),(15,"o"),(25,"y"),(35,"cc"),(45,"mm"),(1,"a"),(2,"b"),(3,"c"),
            (4,"d"),(6,"f"),(7,"g"),(8,"h"),(9,"i"),(10,"j"),(11,"k"),(12,"l")]
    for k,v in data:
        bpt.insert(k,v)

    print("Search 10:", bpt.search(10))
    print("Range [4,11]:", bpt.range_search(4,11))
```

**What to notice**:

* Internal nodes only direct search with separator keys.
* All records live in leaves; leaf nodes are linked for efficient ranges.
* Splits propagate up similarly to B-Tree.

---

# 🧭 Already shared (reposting quickly for completeness)

## Traveling Salesman Problem (Held-Karp, DP with bitmask)

```python
from functools import lru_cache

def tsp(dist):
    n = len(dist)
    @lru_cache(None)
    def dp(mask, i):
        if mask == (1 << n) - 1:
            return dist[i][0]
        best = float('inf')
        for j in range(n):
            if not (mask & (1 << j)):
                best = min(best, dist[i][j] + dp(mask | (1 << j), j))
        return best
    return dp(1, 0)

# demo
# dist = [[...]]
# print(tsp(dist))
```

## Kahn’s Algorithm (Topological Sort, BFS indegrees)

```python
from collections import defaultdict, deque

def kahn_topological_sort(V, edges):
    indeg = [0]*V
    adj = defaultdict(list)
    for u,v in edges:
        adj[u].append(v)
        indeg[v] += 1

    q = deque([i for i in range(V) if indeg[i]==0])
    topo = []
    while q:
        u = q.popleft()
        topo.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v]==0:
                q.append(v)
    return topo if len(topo)==V else "Cycle detected"
```

---

# When to use what (quick guide)

* **AVL**: frequent searches + many inserts/deletes in memory; strict height balance (lower lookup variance).
* **Red-Black**: slightly faster inserts/deletes on average (fewer rotations); widely used in language libs (TreeMap/TreeSet).
* **B-Tree**: on-disk indexes with large branching factor; internal nodes store keys+values.
* **B+ Tree**: databases & filesystems; all data in leaves + linked leaves → blazing fast range scans and sequential reads.
* **TSP**: small N exact solutions; for large N use heuristics (2-opt, 3-opt, Christofides).
* **Kahn**: topological order for DAGs; course scheduling, build pipelines.

---



```python
def process_status_code(status_code):
    match status_code:
        case 200:
            return "OK - Success"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case 403:
            return "Forbidden"
        case _:  # Default case (wildcard)
            return f"Unknown status code: {status_code}"

# Usage
print(process_status_code(200))  # OK - Success
print(process_status_code(404))  # Not Found
print(process_status_code(999))  # Unknown status code: 999

```

---

Threading allows programs to run multiple tasks simultaneously, improving performance especially for I/O-bound operations. Both Python and Java support threading, but with some key differences in syntax and behavior.[1][2][3]

## Basic Thread Creation

### Python Threading
```python
import threading
import time

def worker(name, delay):
    print(f"Thread {name} starting")
    time.sleep(delay)
    print(f"Thread {name} finished")

# Create and start threads
t1 = threading.Thread(target=worker, args=("A", 2))
t2 = threading.Thread(target=worker, args=("B", 1))

t1.start()
t2.start()

# Wait for threads to complete
t1.join()
t2.join()
print("All threads completed")
```


### Java Threading
```java
class WorkerThread extends Thread {
    private String name;
    private int delay;
    
    public WorkerThread(String name, int delay) {
        this.name = name;
        this.delay = delay;
    }
    
    public void run() {
        System.out.println("Thread " + name + " starting");
        try {
            Thread.sleep(delay * 1000);
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
        System.out.println("Thread " + name + " finished");
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        WorkerThread t1 = new WorkerThread("A", 2);
        WorkerThread t2 = new WorkerThread("B", 1);
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("All threads completed");
    }
}
```


### Alternative Java approach using Runnable
```java
class Worker implements Runnable {
    private String name;
    private int delay;
    
    public Worker(String name, int delay) {
        this.name = name;
        this.delay = delay;
    }
    
    public void run() {
        System.out.println("Thread " + name + " starting");
        try {
            Thread.sleep(delay * 1000);
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
        System.out.println("Thread " + name + " finished");
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        Thread t1 = new Thread(new Worker("A", 2));
        Thread t2 = new Thread(new Worker("B", 1));
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("All threads completed");
    }
}
```


## Thread Synchronization (Locks)

### Python Synchronization
```python
import threading
import time

counter = 0
lock = threading.Lock()

def increment(name, times):
    global counter
    for i in range(times):
        with lock:  # Acquire lock automatically
            temp = counter
            time.sleep(0.001)  # Simulate work
            counter = temp + 1
        print(f"{name}: {counter}")

# Create threads
t1 = threading.Thread(target=increment, args=("Thread-1", 5))
t2 = threading.Thread(target=increment, args=("Thread-2", 5))

t1.start()
t2.start()

t1.join()
t2.join()

print(f"Final counter: {counter}")
```


### Java Synchronization
```java
class Counter {
    private int count = 0;
    
    public synchronized void increment(String name) {
        int temp = count;
        try {
            Thread.sleep(1); // Simulate work
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted");
        }
        count = temp + 1;
        System.out.println(name + ": " + count);
    }
    
    public int getCount() {
        return count;
    }
}

class IncrementThread extends Thread {
    private Counter counter;
    private String name;
    private int times;
    
    public IncrementThread(Counter counter, String name, int times) {
        this.counter = counter;
        this.name = name;
        this.times = times;
    }
    
    public void run() {
        for (int i = 0; i < times; i++) {
            counter.increment(name);
        }
    }
}

public class SyncExample {
    public static void main(String[] args) {
        Counter counter = new Counter();
        
        IncrementThread t1 = new IncrementThread(counter, "Thread-1", 5);
        IncrementThread t2 = new IncrementThread(counter, "Thread-2", 5);
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("Final counter: " + counter.getCount());
    }
}
```


## Producer-Consumer Pattern

### Python Producer-Consumer
```python
import threading
import queue
import time
import random

# Thread-safe queue
q = queue.Queue(maxsize=3)

def producer(name):
    for i in range(5):
        item = f"{name}-item-{i}"
        q.put(item)
        print(f"Producer {name}: Added {item}")
        time.sleep(random.uniform(0.1, 0.5))

def consumer(name):
    while True:
        try:
            item = q.get(timeout=2)
            print(f"Consumer {name}: Processing {item}")
            time.sleep(random.uniform(0.2, 0.8))
            q.task_done()
        except queue.Empty:
            print(f"Consumer {name}: No more items")
            break

# Start threads
producer_thread = threading.Thread(target=producer, args=("P1",))
consumer_thread = threading.Thread(target=consumer, args=("C1",))

producer_thread.start()
consumer_thread.start()

producer_thread.join()
consumer_thread.join()
```


### Java Producer-Consumer
```java
import java.util.LinkedList;
import java.util.Queue;

class Buffer {
    private Queue<String> queue = new LinkedList<>();
    private int capacity;
    
    public Buffer(int capacity) {
        this.capacity = capacity;
    }
    
    public synchronized void put(String item) throws InterruptedException {
        while (queue.size() == capacity) {
            wait(); // Wait if buffer is full
        }
        queue.add(item);
        System.out.println("Produced: " + item);
        notifyAll(); // Notify waiting consumers
    }
    
    public synchronized String get() throws InterruptedException {
        while (queue.isEmpty()) {
            wait(); // Wait if buffer is empty
        }
        String item = queue.poll();
        System.out.println("Consumed: " + item);
        notifyAll(); // Notify waiting producers
        return item;
    }
}

class Producer extends Thread {
    private Buffer buffer;
    private String name;
    
    public Producer(Buffer buffer, String name) {
        this.buffer = buffer;
        this.name = name;
    }
    
    public void run() {
        try {
            for (int i = 0; i < 5; i++) {
                String item = name + "-item-" + i;
                buffer.put(item);
                Thread.sleep(100);
            }
        } catch (InterruptedException e) {
            System.out.println("Producer interrupted");
        }
    }
}

class Consumer extends Thread {
    private Buffer buffer;
    private String name;
    
    public Consumer(Buffer buffer, String name) {
        this.buffer = buffer;
        this.name = name;
    }
    
    public void run() {
        try {
            for (int i = 0; i < 5; i++) {
                buffer.get();
                Thread.sleep(200);
            }
        } catch (InterruptedException e) {
            System.out.println("Consumer interrupted");
        }
    }
}

public class ProducerConsumer {
    public static void main(String[] args) {
        Buffer buffer = new Buffer(3);
        
        Producer producer = new Producer(buffer, "P1");
        Consumer consumer = new Consumer(buffer, "C1");
        
        producer.start();
        consumer.start();
        
        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
    }
}
```


## Key Differences

| Feature | Python | Java |
|---------|--------|------|
| **Thread Creation** | `threading.Thread(target=func)` [21] | Extend `Thread` class or implement `Runnable` [6] |
| **Synchronization** | `with lock:` or `lock.acquire()/release()` [21] | `synchronized` keyword or explicit locks [4][5] |
| **Built-in Queues** | `queue.Queue()` thread-safe [6] | Manual implementation with `wait()/notify()` [8] |
| **Exception Handling** | Automatic cleanup with `with` statement [3] | Manual try-catch in threads [7] |
| **GIL Impact** | Limited CPU parallelism due to Global Interpreter Lock [8] | True parallelism for CPU-bound tasks [9] |

Passing objects as parameters in Java involves passing a copy of the object reference (not the object itself), which allows the method to access and modify the original object's properties. Java is always "pass-by-value," but for objects, the value being passed is the reference to the object in memory.[1][2][3][4]

## Basic Object Parameter Passing

### Simple object passing
```java
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class ObjectParameterExample {
    // Method that takes a Person object as parameter
    public static void displayPersonInfo(Person p) {
        System.out.println("Displaying person info:");
        p.displayInfo();
    }
    
    // Method that modifies the object
    public static void updatePersonAge(Person p, int newAge) {
        p.setAge(newAge);
        System.out.println("Updated age to: " + newAge);
    }
    
    public static void main(String[] args) {
        Person person1 = new Person("John", 25);
        
        // Pass object to method
        displayPersonInfo(person1);
        
        // Modify object through method
        updatePersonAge(person1, 30);
        
        // Check if original object was modified
        person1.displayInfo(); // Age will be 30
    }
}
```


### Multiple object parameters
```java
class Student {
    private String name;
    private double grade;
    
    public Student(String name, double grade) {
        this.name = name;
        this.grade = grade;
    }
    
    public String getName() { return name; }
    public double getGrade() { return grade; }
    public void setGrade(double grade) { this.grade = grade; }
}

public class MultipleObjectParameters {
    // Method taking multiple object parameters
    public static void compareStudents(Student s1, Student s2) {
        System.out.println("Comparing students:");
        System.out.println(s1.getName() + ": " + s1.getGrade());
        System.out.println(s2.getName() + ": " + s2.getGrade());
        
        if (s1.getGrade() > s2.getGrade()) {
            System.out.println(s1.getName() + " has higher grade");
        } else if (s2.getGrade() > s1.getGrade()) {
            System.out.println(s2.getName() + " has higher grade");
        } else {
            System.out.println("Both have same grade");
        }
    }
    
    // Method that swaps grades between students
    public static void swapGrades(Student s1, Student s2) {
        double temp = s1.getGrade();
        s1.setGrade(s2.getGrade());
        s2.setGrade(temp);
        System.out.println("Grades swapped!");
    }
    
    public static void main(String[] args) {
        Student alice = new Student("Alice", 85.5);
        Student bob = new Student("Bob", 92.0);
        
        compareStudents(alice, bob);
        
        System.out.println("\nBefore swap:");
        System.out.println("Alice: " + alice.getGrade());
        System.out.println("Bob: " + bob.getGrade());
        
        swapGrades(alice, bob);
        
        System.out.println("\nAfter swap:");
        System.out.println("Alice: " + alice.getGrade());
        System.out.println("Bob: " + bob.getGrade());
    }
}
```


## Object Modification vs Reference Change

### What works - Modifying object properties
```java
class Counter {
    private int count;
    
    public Counter(int count) {
        this.count = count;
    }
    
    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }
    public void increment() { this.count++; }
}

public class ObjectModification {
    // This WORKS - modifies the object's state
    public static void incrementCounter(Counter c) {
        c.increment();
        System.out.println("Counter incremented inside method: " + c.getCount());
    }
    
    // This WORKS - changes object properties
    public static void resetCounter(Counter c, int newValue) {
        c.setCount(newValue);
        System.out.println("Counter reset to: " + newValue);
    }
    
    public static void main(String[] args) {
        Counter myCounter = new Counter(5);
        
        System.out.println("Original count: " + myCounter.getCount());
        
        incrementCounter(myCounter);
        System.out.println("After increment: " + myCounter.getCount()); // Will be 6
        
        resetCounter(myCounter, 10);
        System.out.println("After reset: " + myCounter.getCount()); // Will be 10
    }
}
```


### What doesn't work - Reassigning the reference
```java
class Box {
    private String contents;
    
    public Box(String contents) {
        this.contents = contents;
    }
    
    public String getContents() { return contents; }
    public void setContents(String contents) { this.contents = contents; }
}

public class ReferenceReassignment {
    // This DOESN'T work - cannot change what the original reference points to
    public static void tryToChangeReference(Box b) {
        b = new Box("New Box"); // This creates a new object but doesn't change original
        System.out.println("Inside method: " + b.getContents());
    }
    
    // This WORKS - modifies the existing object
    public static void changeContents(Box b) {
        b.setContents("Modified Contents");
    }
    
    public static void main(String[] args) {
        Box originalBox = new Box("Original Contents");
        
        System.out.println("Before tryToChangeReference: " + originalBox.getContents());
        tryToChangeReference(originalBox);
        System.out.println("After tryToChangeReference: " + originalBox.getContents()); 
        // Still "Original Contents" - reference wasn't changed
        
        System.out.println("\nBefore changeContents: " + originalBox.getContents());
        changeContents(originalBox);
        System.out.println("After changeContents: " + originalBox.getContents()); 
        // Now "Modified Contents" - object was modified
    }
}
```


## Array as Object Parameter

```java
public class ArrayParameter {
    // Arrays are objects, so same rules apply
    public static void modifyArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            arr[i] = arr[i] * 2;
        }
        System.out.println("Array modified inside method");
    }
    
    // This won't change the original array reference
    public static void tryToReplaceArray(int[] arr) {
        arr = new int[]{100, 200, 300}; // Creates new array, doesn't affect original
        System.out.println("New array created inside method");
    }
    
    public static void displayArray(int[] arr) {
        System.out.print("Array contents: ");
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.println("Original array:");
        displayArray(numbers);
        
        modifyArray(numbers);
        System.out.println("After modification:");
        displayArray(numbers); // Values will be doubled
        
        tryToReplaceArray(numbers);
        System.out.println("After trying to replace:");
        displayArray(numbers); // Still the doubled values, not {100, 200, 300}
    }
}
```


## Custom Objects with Complex Operations

```java
class BankAccount {
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    
    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount);
            return true;
        }
        System.out.println("Insufficient funds or invalid amount");
        return false;
    }
    
    public void displayAccount() {
        System.out.println("Account: " + accountNumber + ", Balance: $" + balance);
    }
}

public class BankOperations {
    // Transfer money between accounts
    public static boolean transferMoney(BankAccount from, BankAccount to, double amount) {
        System.out.println("Attempting to transfer $" + amount);
        
        if (from.withdraw(amount)) {
            to.deposit(amount);
            System.out.println("Transfer successful!");
            return true;
        } else {
            System.out.println("Transfer failed!");
            return false;
        }
    }
    
    // Apply interest to an account
    public static void applyInterest(BankAccount account, double interestRate) {
        double interest = account.getBalance() * interestRate / 100;
        account.deposit(interest);
        System.out.println("Interest applied: " + interestRate + "%");
    }
    
    // Compare two accounts
    public static void compareAccounts(BankAccount acc1, BankAccount acc2) {
        System.out.println("\nAccount comparison:");
        acc1.displayAccount();
        acc2.displayAccount();
        
        if (acc1.getBalance() > acc2.getBalance()) {
            System.out.println(acc1.getAccountNumber() + " has higher balance");
        } else if (acc2.getBalance() > acc1.getBalance()) {
            System.out.println(acc2.getAccountNumber() + " has higher balance");
        } else {
            System.out.println("Both accounts have equal balance");
        }
    }
    
    public static void main(String[] args) {
        BankAccount alice = new BankAccount("ACC001", 1000.0);
        BankAccount bob = new BankAccount("ACC002", 500.0);
        
        System.out.println("Initial state:");
        alice.displayAccount();
        bob.displayAccount();
        
        // Transfer money
        transferMoney(alice, bob, 200.0);
        
        System.out.println("\nAfter transfer:");
        alice.displayAccount();
        bob.displayAccount();
        
        // Apply interest
        applyInterest(alice, 2.5);
        applyInterest(bob, 2.5);
        
        System.out.println("\nAfter interest:");
        alice.displayAccount();
        bob.displayAccount();
        
        // Compare accounts
        compareAccounts(alice, bob);
    }
}
```


## Key Rules for Object Parameters

### What you can do
- **Modify object properties**: Change field values using setter methods[3][1]
- **Call object methods**: Invoke any public methods on the passed object[2]
- **Access object data**: Read object properties through getter methods[5]
- **Modify object state**: Change the internal state of the object[3]

### What you cannot do
- **Change the reference**: Cannot make the original variable point to a different object[4][6]
- **Reassign the parameter**: `obj = new Object()` inside method won't affect original[4]

### Memory explanation
When you pass an object to a method, Java copies the reference value (memory address) to the method parameter, so both the original variable and the parameter point to the same object in memory. This means:[7][3]
- Changes to the object affect the original (same object in memory)[1]
- Reassigning the parameter creates a new reference but doesn't change the original variable[4]

This behavior makes object passing in Java very powerful for modifying objects while maintaining clear boundaries about what can and cannot be changed.[1][3]
