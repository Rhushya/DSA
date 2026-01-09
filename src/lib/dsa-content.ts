import fs from 'fs';
import path from 'path';

export function getBasicContent(): string {
    const filePath = path.join(process.cwd(), 'src', 'content', 'BASIC.md');
    return fs.readFileSync(filePath, 'utf-8');
}

export function getAdvanceContent(): string {
    const filePath = path.join(process.cwd(), 'src', 'content', 'ADVANCE.md');
    return fs.readFileSync(filePath, 'utf-8');
}

// Section definitions for sidebar - IDs match markdown headings
export const basicSections = [
    { id: 'arrays', title: 'Arrays' },
    { id: 'linked-lists', title: 'Linked Lists' },
    { id: 'sorting', title: 'Sorting' },
    { id: 'binary-search', title: 'Binary Search' },
    { id: 'trees', title: 'Trees' },
    { id: 'backtracking', title: 'Backtracking' },
    { id: 'heap--priority-queue', title: 'Heap / Priority Queue' },
    { id: 'hashing', title: 'Hashing' },
    { id: 'graphs', title: 'Graphs' },
    { id: 'dynamic-programming', title: 'Dynamic Programming' },
    { id: 'bit-manipulation', title: 'Bit Manipulation' },
    { id: 'advance', title: 'ADVANCE' },
];

export const advanceSections = [
    { id: 'backtracking-extra', title: 'BackTracking Extra' },
    { id: 'trees-1', title: 'Trees (BST)' },
    { id: 'graphs-1', title: 'Graphs' },
    { id: '0-1-knapsack', title: '0-1 Knapsack' },
    { id: 'cycle-directed-and-undirected-in-graphs-1', title: 'Cycle Detection' },
    { id: 'extra-graph-algo-1', title: 'Graph Algorithms' },
    { id: 'tree-algorithms', title: 'Tree Algorithms' },
    { id: 'python-extras-general', title: 'Python Utilities' },
];

export const allSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'basic', title: '--- BASIC ---' },
    ...basicSections,
    { id: 'advance-section', title: '--- ADVANCE ---' },
    ...advanceSections,
];
