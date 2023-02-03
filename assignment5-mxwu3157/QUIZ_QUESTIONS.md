# Quiz questions

Add 3 questions using the format of the sample question below. `(*)` denotes the correct answer.

---

Reference: Slide 

Question: What are dimension related to Clarity?

A. Functionality(*)

B. Density

C.Multidimensionality

D.Familiarity

---

Reference: Quiz

Question: Which one if correct about the achieving boom effect in infovisualization?

A. Dumb down data to decrease the information density and add eye-catching component

B. Experiment (carefully) with novel (original) forms(*)

C. Add more decoration regardless whether it is redundant

D. Make story comes first then think about explain data

---

Reference: Reading

Question: How do you make a bar chart with special color schema?

A. .attr("fill", function(d) {
 return "rgb(0, 0," +  Math.random())+ ")";
});


B. .attr("fill", function(d) {
 return "rgb(0, 0," + d => d.value + ")";
});

C.  .attr("fill", function(d) {
 return "rgb(0, 0, " + Math.round(d * 10) + ")";
}); (*)

D. .attr("fill", function(d) {
 return "rgb(0, 0, " + Math.round(d * 10) + ")";
});
