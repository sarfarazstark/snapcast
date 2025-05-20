import { getAllVideosMock, mockVideoData } from './video.mock';

// Test Case 1: Default retrieval
console.log("Running test: Default retrieval...");
const defaultResult = getAllVideosMock();
console.assert(defaultResult.videos.length <= 8, "Test Case 1 Failed: Default retrieval video count");
console.assert(defaultResult.pagination.currentPage === 1, "Test Case 1 Failed: Default retrieval current page");
console.assert(defaultResult.pagination.totalVideos === mockVideoData.length, "Test Case 1 Failed: Default retrieval total videos");
// Check default sorting (createdAt descending) - assuming mockVideoData is not already sorted this way
// For this, we'd need to know the exact order of mockVideoData or sort it here for comparison.
// For simplicity, we'll check if the first video is the one with the latest createdAt among the first page.
const sortedMockDataByDateDesc = [...mockVideoData].sort((a, b) => new Date(b.video.createdAt).getTime() - new Date(a.video.createdAt).getTime());
console.assert(defaultResult.videos[0].video.id === sortedMockDataByDateDesc[0].video.id, "Test Case 1 Failed: Default sort order (createdAt desc)");


// Test Case 2: Filtering
console.log("Running test: Filtering...");
const filterQuery = "Quantum Computing";
const filterResult = getAllVideosMock(filterQuery);
const expectedFilteredVideos = mockVideoData.filter(entry => entry.video.title.includes(filterQuery));
console.assert(filterResult.videos.length === expectedFilteredVideos.length, "Test Case 2 Failed: Filtering video count");
console.assert(filterResult.videos.every(v => v.video.title.includes(filterQuery)), "Test Case 2 Failed: Video content matches query");
console.assert(filterResult.pagination.totalVideos === expectedFilteredVideos.length, "Test Case 2 Failed: Filtering total videos in pagination");


// Test Case 3: Pagination
console.log("Running test: Pagination...");
const pageNumber = 2;
const pageSize = 1;
const paginationResult = getAllVideosMock(undefined, undefined, pageNumber, pageSize);
// Assuming default sort (createdAt descending) for pagination check
const secondVideoByDefaultSort = sortedMockDataByDateDesc[1];
console.assert(paginationResult.videos.length === pageSize, "Test Case 3 Failed: Pagination video count");
console.assert(paginationResult.videos[0].video.id === secondVideoByDefaultSort.video.id, "Test Case 3 Failed: Correct video on page 2");
console.assert(paginationResult.pagination.currentPage === pageNumber, "Test Case 3 Failed: Pagination current page");
console.assert(paginationResult.pagination.totalPages === mockVideoData.length, "Test Case 3 Failed: Pagination total pages with pageSize 1");


// Test Case 4: Sorting
console.log("Running test: Sorting (views_asc)...");
const sortResult = getAllVideosMock(undefined, "views_asc");
console.assert(sortResult.videos.length > 0, "Test Case 4 Failed: No videos returned for sorting test");
if (sortResult.videos.length > 1) {
  console.assert(sortResult.videos[0].video.views <= sortResult.videos[1].video.views, "Test Case 4 Failed: Sorting views_asc order");
}
// Check if all videos are sorted by views ascending
for (let i = 0; i < sortResult.videos.length - 1; i++) {
  console.assert(sortResult.videos[i].video.views <= sortResult.videos[i+1].video.views, `Test Case 4 Failed: Sorting views_asc order at index ${i}`);
}


console.log("\nAll mock tests complete. Check console for errors if any assertions failed.");
// To actually run these tests, you'd typically execute this file with Node.js
// e.g., node lib/actions/video.mock.test.js (after compiling TS to JS)
// Or using a TypeScript runner like ts-node: ts-node lib/actions/video.mock.test.ts
