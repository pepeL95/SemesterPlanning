module.exports = class Node {
 constructor(courseAbbv, courseId, courseName, isChecked, isChild, hasChildren) {
    this.courseAbbv = courseAbbv
    this.courseId = courseId
    this.courseName = courseName
    this.isChecked = isChecked
    this.hasChildren = hasChildren
    this.isChild = isChild
 }
 // getters
   getCourseAbbv() {return this.courseAbbv}
   getCourseId() {return this.courseId}
   getCourseName() {return this.courseName}
   isCourseTaken() {return this.isChecked}
   isPrereq() {return this.hasChildren}
   hasPrereq() {return  isChild}
}