$(document).ready(function () {
    // Append values to the display
    $(".btn, .operator").on("click", function () {
        let value = $(this).text(); // Get the text of the clicked button
        $("#display").val($("#display").val() + value); // Append to display
    });

    // Clear the display
    $(".btnoperator").first().on("click", function () {
        $("#display").val(""); // Clear the display
    });

    // Clear the last digit
    $(".btnoperator").eq(1).on("click", function () {
        let currentValue = $("#display").val();
        $("#display").val(currentValue.slice(0, -1)); // Remove the last character
    });

    // Calculate the result
    $(".btnoperator").last().on("click", function () {
        try {
            let result = eval($("#display").val()); // Evaluate the expression
            $("#display").val(result); // Display the result
        } catch (error) {
            $("#display").val("Error"); // Show error message if invalid
        }
    });
});
