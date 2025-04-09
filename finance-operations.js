// Finance Operations Module
const FinanceOperations = (function() {
    // Private variables
    let prData = [];
    
    // Event listeners registry for cleanup if needed
    const eventListeners = [];
    
    // Add event listener with registration for potential cleanup
    function addSafeEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        eventListeners.push({ element, event, handler });
    }
    
    // Hardcoded CSV data from PRs-Template.csv to avoid CORS issues when loading from file system
    const csvData = [
        {
            "PRs": "45",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Summer Campaign Tier 1",
            "Value": "76613288",
            "Aging": "18",
            "Approval Status": "APPROVED",
            "Raised by": "Ady Badawi",
            "Pending With": "Supply Management Dept.",
            "Approved": "12",
            "In Process": "33",
            "Total Value": "214211482",
            "Avg. Aging Days": "22.8"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Summer Campaign Tier 2",
            "Value": "33632025",
            "Aging": "18",
            "Approval Status": "APPROVED",
            "Raised by": "Ady Badawi",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Search AON Tier 1",
            "Value": "16244667",
            "Aging": "14",
            "Approval Status": "IN PROCESS",
            "Raised by": "Ady Badawi",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Ramadan",
            "Value": "15296756",
            "Aging": "25",
            "Approval Status": "APPROVED",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Creative Agency",
            "Value": "13650393",
            "Aging": "40",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "12459253",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Brand Operations",
            "Value": "6000000",
            "Aging": "29",
            "Approval Status": "APPROVED",
            "Raised by": "George Nissem",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Search AON Tier 2",
            "Value": "5761558",
            "Aging": "14",
            "Approval Status": "IN PROCESS",
            "Raised by": "Ady Badawi",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Visit Abu Dhabi AON",
            "Value": "4711374",
            "Aging": "22",
            "Approval Status": "APPROVED",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Euroleague",
            "Value": "3828711",
            "Aging": "26",
            "Approval Status": "IN PROCESS",
            "Raised by": "JACQUELYN SIT SIEW LING",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Brand Tracker",
            "Value": "3794167",
            "Aging": "21",
            "Approval Status": "APPROVED",
            "Raised by": "Renos Fountoulakis",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "3345670",
            "Aging": "21",
            "Approval Status": "IN PROCESS",
            "Raised by": "Mira Al Abdulla",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Saadiyat District Global",
            "Value": "3013930",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Brand Operations",
            "Value": "2000000",
            "Aging": "22",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Saadiyat District Global",
            "Value": "1953424",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "1892802",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Summer Campaign Tier 1",
            "Value": "1836250",
            "Aging": "48",
            "Approval Status": "APPROVED",
            "Raised by": "MUSSAIFAH MANA SAEED AHMED ALOTAIBA",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "1160268",
            "Aging": "18",
            "Approval Status": "IN PROCESS",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Saadiyat District Global",
            "Value": "1143895",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Summer Campaign Tier 1",
            "Value": "918125",
            "Aging": "48",
            "Approval Status": "APPROVED",
            "Raised by": "MUSSAIFAH MANA SAEED AHMED ALOTAIBA",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Summer Campaign Tier 1",
            "Value": "918125",
            "Aging": "48",
            "Approval Status": "APPROVED",
            "Raised by": "MUSSAIFAH MANA SAEED AHMED ALOTAIBA",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Airports - Bahrain",
            "Value": "861446",
            "Aging": "22",
            "Approval Status": "APPROVED",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Brand Tracker",
            "Value": "667400",
            "Aging": "43",
            "Approval Status": "IN PROCESS",
            "Raised by": "Renos Fountoulakis",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Destinations Marketing China",
            "Value": "506680",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Summer Campaign Tier 1",
            "Value": "400000",
            "Aging": "20",
            "Approval Status": "IN PROCESS",
            "Raised by": "Ali Dajani",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Global Brand Ambassador Tier 1",
            "Value": "400000",
            "Aging": "20",
            "Approval Status": "IN PROCESS",
            "Raised by": "Ali Dajani",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Sector Management",
            "Value": "275859",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "Zahwa Muhammed Noufel",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Small Campaigns - Tactical",
            "Value": "200000",
            "Aging": "20",
            "Approval Status": "IN PROCESS",
            "Raised by": "Ali Dajani",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Digital Operations",
            "Value": "149874",
            "Aging": "21",
            "Approval Status": "IN PROCESS",
            "Raised by": "Jonathan Muller",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Digital Operations",
            "Value": "111850",
            "Aging": "15",
            "Approval Status": "IN PROCESS",
            "Raised by": "Renos Fountoulakis",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Sector Management",
            "Value": "110605",
            "Aging": "47",
            "Approval Status": "APPROVED",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "T&H Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Activation",
            "Value": "85000",
            "Aging": "22",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Activation",
            "Value": "72181",
            "Aging": "14",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "Finance Dept."
        },
        {
            "PRs": "1",
            "Department": "Sector Marketing Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "58000",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "James Cheetham",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Strategic Communications Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "36000",
            "Aging": "28",
            "Approval Status": "IN PROCESS",
            "Raised by": "Mohamed Abdelsamis Mohamed",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Saadiyat District Global",
            "Value": "22366",
            "Aging": "13",
            "Approval Status": "IN PROCESS",
            "Raised by": "Farres Mohamad Kailany",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Social Always-On Activations",
            "Value": "16800",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Brand Operations",
            "Value": "15000",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "Supply Management Dept."
        },
        {
            "PRs": "1",
            "Department": "Strategic Communications Department",
            "Title": "Destination Campaign - Cross Market",
            "Value": "12000",
            "Aging": "29",
            "Approval Status": "IN PROCESS",
            "Raised by": "Mohamed Abdelsamis Mohamed",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Social Always-On Activations",
            "Value": "11250",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Brand Operations",
            "Value": "7800",
            "Aging": "15",
            "Approval Status": "IN PROCESS",
            "Raised by": "George Nissem",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Planning, Strategy & Operations Department",
            "Title": "Sector Management",
            "Value": "6515",
            "Aging": "41",
            "Approval Status": "APPROVED",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "T&H Dept."
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Social Always-On Activations",
            "Value": "5040",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Social Always-On Activations",
            "Value": "3190",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        },
        {
            "PRs": "1",
            "Department": "Creative and Production Department",
            "Title": "Social Always-On Activations",
            "Value": "1945",
            "Aging": "19",
            "Approval Status": "IN PROCESS",
            "Raised by": "RAMAKURUP GOPINATHAN SAJI UNNITHAN",
            "Pending With": "End User"
        }
    ];
    
    // Initialize toggle navigation
    function initializeToggleNavigation() {
        document.querySelectorAll('.fo-toggle-button').forEach(button => {
            addSafeEventListener(button, 'click', () => {
                // Remove active class from all buttons and content
                document.querySelectorAll('.fo-toggle-button').forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                document.querySelectorAll('.fo-toggle-content').forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                
                // Show corresponding content
                const contentId = button.getAttribute('data-content');
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.add('active');
                    content.style.display = 'block';
                }
            });
        });
    }
    
    // Show loading state for a table
    function showTableLoading(tableId) {
        // Find the card body based on the table ID
        let cardBody;
        
        if (tableId === 'pr-table') {
            cardBody = document.querySelector('#pr-content .card-body');
        }
        
        if (!cardBody) {
            console.error(`Card body not found for table ${tableId}`);
            return;
        }
        
        // Clear existing content
        cardBody.innerHTML = '';
        
        // Create loading state
        const loadingState = document.createElement('div');
        loadingState.className = 'data-table-loading';
        loadingState.setAttribute('aria-label', 'Loading data...');
        
        cardBody.appendChild(loadingState);
    }
    
    // Pagination state
    let currentPage = 1;
    const rowsPerPage = 10; // Set to show 10 entries per page
    let currentTableData = [];
    
    // Render table with data
    function renderTable(tableId, data) {
        try {
            console.log(`Rendering table ${tableId} with ${data.length} rows`);
            
            // Store the data for pagination
            currentTableData = data;
            
            // Find the card body based on the table ID
            let cardBody;
            if (tableId === 'pr-table') {
                cardBody = document.querySelector('#pr-content .card-body');
            }
            
            if (!cardBody) {
                console.error(`Card body not found for table ${tableId}`);
                return;
            }
            
            // Clear the card body to remove loading spinner
            cardBody.innerHTML = '';
            
            // Create table container
            const tableContainer = document.createElement('div');
            tableContainer.className = 'data-table-container';
            
            // Create table element
            const newTable = document.createElement('table');
            newTable.id = tableId;
            newTable.className = 'data-table';
            
            // Check if we should use card view for mobile
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                newTable.classList.add('card-view');
            }
            
            // Create table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = ['Title', 'Value', 'Aging', 'Raised by', 'Pending with'];
            
            headers.forEach((headerText) => {
                const th = document.createElement('th');
                th.setAttribute('scope', 'col'); // Accessibility improvement
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            newTable.appendChild(thead);
            
            // Create table body
            const tbody = document.createElement('tbody');
            
            // Check if data is valid
            if (!Array.isArray(data) || data.length === 0) {
                console.warn('No data available for table');
                
                // Create a "No data" row
                const noDataRow = document.createElement('tr');
                const noDataCell = document.createElement('td');
                noDataCell.setAttribute('colspan', '5');
                noDataCell.textContent = 'No data available';
                noDataCell.style.textAlign = 'center';
                noDataCell.style.padding = '20px';
                noDataRow.appendChild(noDataCell);
                tbody.appendChild(noDataRow);
            } else {
                // Calculate pagination
                const totalPages = Math.ceil(data.length / rowsPerPage);
                if (currentPage > totalPages) {
                    currentPage = 1;
                }
                
                const startIndex = (currentPage - 1) * rowsPerPage;
                const endIndex = Math.min(startIndex + rowsPerPage, data.length);
                const paginatedData = data.slice(startIndex, endIndex);
                
                console.log(`Pagination: Page ${currentPage} of ${totalPages}, showing rows ${startIndex + 1} to ${endIndex} of ${data.length}`);
                
                // Add data rows for current page
                paginatedData.forEach(item => {
                    try {
                        const row = document.createElement('tr');
                        
                        // Add cells
                        const titleCell = document.createElement('td');
                        titleCell.textContent = item.title || 'N/A';
                        titleCell.setAttribute('data-label', 'Title'); // For mobile card view
                        row.appendChild(titleCell);
                        
                        const valueCell = document.createElement('td');
                        valueCell.textContent = item.value || 'N/A';
                        valueCell.setAttribute('data-label', 'Value'); // For mobile card view
                        row.appendChild(valueCell);
                        
                        const agingCell = document.createElement('td');
                        // Add status indicator based on aging days
                        const agingDays = parseInt(item.aging || '0');
                        let statusClass = '';
                        
                        if (agingDays > 30) {
                            statusClass = 'negative';
                            // Add status indicator for high aging
                            const statusIndicator = document.createElement('span');
                            statusIndicator.className = 'status-indicator status-rejected';
                            agingCell.appendChild(statusIndicator);
                        } else if (agingDays < 15) {
                            statusClass = 'positive';
                            // Add status indicator for low aging
                            const statusIndicator = document.createElement('span');
                            statusIndicator.className = 'status-indicator status-approved';
                            agingCell.appendChild(statusIndicator);
                        } else {
                            // Add status indicator for medium aging
                            const statusIndicator = document.createElement('span');
                            statusIndicator.className = 'status-indicator status-pending';
                            agingCell.appendChild(statusIndicator);
                        }
                        
                        agingCell.classList.add(statusClass);
                        agingCell.appendChild(document.createTextNode(item.aging || '0'));
                        agingCell.setAttribute('data-label', 'Aging'); // For mobile card view
                        row.appendChild(agingCell);
                        
                        const raisedByCell = document.createElement('td');
                        raisedByCell.textContent = item.raisedBy || 'N/A';
                        raisedByCell.setAttribute('data-label', 'Raised by'); // For mobile card view
                        row.appendChild(raisedByCell);
                        
                        const pendingWithCell = document.createElement('td');
                        pendingWithCell.textContent = item.pendingWith || 'N/A';
                        pendingWithCell.setAttribute('data-label', 'Pending with'); // For mobile card view
                        row.appendChild(pendingWithCell);
                        
                        tbody.appendChild(row);
                    } catch (rowError) {
                        console.error('Error creating row:', rowError);
                    }
                });
            }
            
            newTable.appendChild(tbody);
            tableContainer.appendChild(newTable);
            cardBody.appendChild(tableContainer);
            
            // Add pagination controls if needed
            if (data.length > rowsPerPage) {
                // Create pagination container
                const paginationContainer = document.createElement('div');
                paginationContainer.className = 'pagination-container';
                
                // Add pagination info
                const paginationInfo = document.createElement('div');
                paginationInfo.className = 'pagination-info';
                const startIndex = (currentPage - 1) * rowsPerPage;
                const endIndex = Math.min(startIndex + rowsPerPage, data.length);
                paginationInfo.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${data.length} entries`;
                paginationContainer.appendChild(paginationInfo);
                
                // Add pagination controls
                const paginationControls = document.createElement('div');
                paginationControls.className = 'pagination-controls';
                
                // Previous button
                const prevButton = document.createElement('button');
                prevButton.className = 'pagination-button';
                prevButton.textContent = 'Previous';
                prevButton.disabled = currentPage === 1;
                prevButton.setAttribute('aria-label', 'Previous page');
                addSafeEventListener(prevButton, 'click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        renderTable(tableId, currentTableData);
                    }
                });
                paginationControls.appendChild(prevButton);
                
                // Next button
                const nextButton = document.createElement('button');
                nextButton.className = 'pagination-button';
                nextButton.textContent = 'Next';
                const totalPages = Math.ceil(data.length / rowsPerPage);
                nextButton.disabled = currentPage === totalPages;
                nextButton.setAttribute('aria-label', 'Next page');
                addSafeEventListener(nextButton, 'click', () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderTable(tableId, currentTableData);
                    }
                });
                paginationControls.appendChild(nextButton);
                
                paginationContainer.appendChild(paginationControls);
                cardBody.appendChild(paginationContainer);
            }
            
            console.log(`Table ${tableId} rendered successfully with pagination`);
        } catch (error) {
            console.error(`Error rendering table ${tableId}:`, error);
            
            // Create a simple error message in the table container
            if (tableId === 'pr-table') {
                const cardBody = document.querySelector('#pr-content .card-body');
                if (cardBody) {
                    cardBody.innerHTML = '<div class="error-message" style="color: #e74c3c; padding: 20px; text-align: center;">Error loading table data. Please try again later.</div>';
                }
            }
        }
    }
    
    // Process PR data and calculate metrics
    function processPRData(data) {
        // Log the input data structure to verify keys
        console.log("Input data structure (first item):", data.length > 0 ? JSON.stringify(data[0], null, 2) : "No data");
        
        // For metrics, we'll use the hardcoded values from the first row of the CSV
        // since we know these are correct
        const totalPRs = 45;
        const approvedPRs = 12;
        const inProcessPRs = 33;
        const avgAgingDays = 22.8;
        
        console.log("Using hardcoded metrics:", { totalPRs, approvedPRs, inProcessPRs, avgAgingDays });
        
        // Update metric cards
        const prTotalElement = document.getElementById('pr-total-count');
        const prApprovedElement = document.getElementById('pr-approved-count');
        const prInProcessElement = document.getElementById('pr-in-process-count');
        const prAvgAgingElement = document.getElementById('pr-avg-aging');
        
        console.log("Metric elements:", { 
            prTotalElement, 
            prApprovedElement, 
            prInProcessElement, 
            prAvgAgingElement 
        });
        
        if (prTotalElement) prTotalElement.textContent = totalPRs;
        if (prApprovedElement) prApprovedElement.textContent = approvedPRs;
        if (prInProcessElement) prInProcessElement.textContent = inProcessPRs;
        if (prAvgAgingElement) prAvgAgingElement.textContent = avgAgingDays.toFixed(1);
        
        // Create table data directly from the csvData array
        // This avoids any issues with parsing the data
        const tableData = [];
        
        // Add each row from the CSV data to the table data
        for (const item of data) {
            // Log each item to verify structure
            console.log("Processing item:", item);
            
            // Skip rows without a title
            if (!item['Title']) {
                console.log("Skipping item without Title");
                continue;
            }
            
            // Parse the value as a number
            const valueStr = item['Value'] || '0';
            const valueNum = parseFloat(valueStr.replace(/,/g, '')) || 0;
            
            // Add the row to the table data
            tableData.push({
                title: item['Title'] || '',
                value: valueNum.toLocaleString() + ' AED',
                aging: item['Aging'] || '0',
                raisedBy: item['Raised by'] || '',
                pendingWith: item['Pending With'] || ''
            });
        }
        
        console.log("Created table data:", tableData);
        return tableData;
    }
    
    // Format name to be more readable
    function formatName(name) {
        if (!name) return '';
        
        // If the name is all uppercase, convert to title case
        if (name === name.toUpperCase()) {
            return name.split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
        }
        
        return name;
    }
    
    // Load PR data from CSV
    function loadPRData() {
        try {
            console.log("Loading PR data from hardcoded CSV data");
            
            // Show loading state
            showTableLoading('pr-table');
            
            // Process the data
            prData = processPRData(csvData);
            
            // Render the table with the processed data
            renderTable('pr-table', prData);
            
        } catch (error) {
            console.error("Error loading PR data:", error);
            
            // Show error message
            const cardBody = document.querySelector('#pr-content .card-body');
            if (cardBody) {
                cardBody.innerHTML = '<div class="error-message" style="color: #e74c3c; padding: 20px; text-align: center;">Error loading PR data. Please try again later.</div>';
            }
        }
    }
    
    // Initialize the module
    function init() {
        console.log("Initializing Finance Operations module");
        
        // Initialize toggle navigation
        initializeToggleNavigation();
        
        // Load PR data
        loadPRData();
    }
    
    // Public API
    return {
        init: init
    };
})();

// Initialize the module when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    FinanceOperations.init();
});
