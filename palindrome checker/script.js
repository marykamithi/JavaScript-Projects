
document.addEventListener('DOMContentLoaded', function () {
    // Function to check if a string is a palindrome
    function isPalindrome(str) {
        const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return cleanedStr === cleanedStr.split('').reverse().join('');
    }

    // Event listener for the check button
    document.getElementById('check-btn').addEventListener('click', function () {
        const textInput = document.getElementById('text-input').value;
        const resultElement = document.getElementById('result');

        if (!textInput.trim()) {
            alert('Please input a value');
            return;
        }

        if (isPalindrome(textInput)) {
            resultElement.textContent = `${textInput} is a palindrome`;
        } else {
            resultElement.textContent = `${textInput} is not a palindrome`;
        }
    });
});