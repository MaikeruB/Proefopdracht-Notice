document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll("tbody tr");
    const timeElement = document.getElementById("time");
    const progressBar = document.getElementById("progress");
    const pageNumberElement = document.getElementById("page-number");
    const totalPagesElement = document.getElementById("total-pages");

    // Update the clock
    function updateClock() {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Paginate the table rows
    const rowsPerPage = 18;
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    let currentPage = 1;

    function showPage(page) {
        rows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? '' : 'none';
        });
        pageNumberElement.textContent = page;
        progressBar.style.transition = "none"; // Disable transition to reset smoothly
        progressBar.style.width = `0%`; // Reset progress bar
        setTimeout(() => {
            progressBar.style.transition = `width ${pageDuration}ms linear`; // Smooth transition
            progressBar.style.width = `100%`; // Animate progress bar to full width
        }, 100); // Slight delay to ensure reset is visible
    }

    totalPagesElement.textContent = totalPages;

    // Calculate the page duration based on 0.5 seconds per row
    const pageDuration = rowsPerPage * 0.5 * 1000; // 0.5 seconds per row

    function autoSwitchPage() {
        showPage(currentPage);

        setTimeout(() => {
            currentPage = (currentPage % totalPages) + 1;
            autoSwitchPage();
        }, pageDuration);
    }

    autoSwitchPage();

        // assigns a color based on the status of the flight
        rows.forEach(row => {
        const status = row.querySelector("td:last-child").textContent.trim().toLowerCase();
        
        switch (status) {
            case 'vertrokken':
                row.style.backgroundColor = "#d4edda";
                break;
            case 'gate geopend':
                row.style.backgroundColor = "#fff3cd";
                break;
            case 'gate sluit':
                row.style.backgroundColor = "#f8d7da";
                break;
            case 'gate veranderd':
                row.style.backgroundColor = "#d1ecf1";
                break;
            case 'op schema':
                row.style.backgroundColor = "#cce5ff";
                break;
            case 'boarden gestart':
                row.style.backgroundColor = "#e2e3e5";
                break;
            default:
                row.style.backgroundColor = "#ffffff";
        }
    })
});
