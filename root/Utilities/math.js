/**
 * Checks whether the intervals [`start1`, `end1`] and [`start2`, `end2`] are mutually exclusive
 * 
 * @param {number} start1 Starting of interval1
 * @param {number} end1 Ending of interval1
 * @param {number} start2 Starting of interval2
 * @param {number} end2 Ending of interval2
 * @pre (`start1` <= `end1`) and (`start2` <= `end2`) 
 * @returns True iff interval1 and interval2 are mutually exclusive
 * @throws Precondition violation
 */
export function isExclusiveIntervals(start1, end1, start2, end2){
    if(!(start1 <= end1 && start2 <= end2)){
        throw "Precondition violated:\n"
        + "--> interval 1: [" + start1 + ", " + end1 + "]"
        + " interval 2: [" + start2 + ", " + end2 + "]";
    }

    if(start1 >= end2 || end1 <= start2){
        return true;
    }else{
        return false;
    }
}