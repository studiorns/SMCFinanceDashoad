// Purchase Orders Data and Table Rendering
document.addEventListener('DOMContentLoaded', function() {
    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    
    // Sorting variables
    let currentSortColumn = '';
    let currentSortDirection = 'asc';
    
    // Detect if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    const isTouchDevice = ('ontouchstart' in window) || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
    
    // Metrics from POs-Template.csv (columns Q to U)
    const poMetrics = {
        totalPOs: 8,
        approvedPOs: 6,
        inProcessPOs: 2,
        partiallyReceivedPOs: 0,
        avgAgingDays: 27.75
    };
    
// Update metric cards with data from POs-Template.csv
function updateMetricCards() {
    // Use a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        const poTotalElement = document.getElementById('po-total-count');
        const poApprovedElement = document.getElementById('po-approved-count');
        const poInProcessElement = document.getElementById('po-in-process-count');
        const poPartiallyReceivedElement = document.getElementById('po-partially-received');
        const poAvgAgingElement = document.getElementById('po-avg-aging');
        
        if (poTotalElement) poTotalElement.textContent = poMetrics.totalPOs;
        if (poApprovedElement) poApprovedElement.textContent = poMetrics.approvedPOs;
        if (poInProcessElement) poInProcessElement.textContent = poMetrics.inProcessPOs;
        if (poPartiallyReceivedElement) poPartiallyReceivedElement.textContent = poMetrics.partiallyReceivedPOs;
        if (poAvgAgingElement) poAvgAgingElement.textContent = poMetrics.avgAgingDays.toFixed(1);
        
        console.log('PO metrics updated:', poMetrics);
    }, 100);
}
    
    // Data from POs-Template.csv
    const poData = [
        {
            "Title": "Destination Campaign - Cross Market",
            "Value": "5602268",
            "Aging": "13",
            "Raised by": "Ady Badawi",
            "Pending with": "End User"
        },
        {
            "Title": "Summer Campaign Tier 1",
            "Value": "4018262",
            "Aging": "41",
            "Raised by": "Mussaifah Mana Saeed Ahmed Alotaiba",
            "Pending with": "End User"
        },
        {
            "Title": "Summer Campaign Tier 1",
            "Value": "1413913",
            "Aging": "43",
            "Raised by": "Mussaifah Mana Saeed Ahmed Alotaiba",
            "Pending with": "End User"
        },
        {
            "Title": "Summer Campaign Tier 1",
            "Value": "312163",
            "Aging": "40",
            "Raised by": "Mussaifah Mana Saeed Ahmed Alotaiba",
            "Pending with": "End User"
        },
        {
            "Title": "Brand Operations",
            "Value": "33000",
            "Aging": "14",
            "Raised by": "Ramakurup Gopinathan Saji Unnithan",
            "Pending with": "End User"
        },
        {
            "Title": "Brand Operations",
            "Value": "15000",
            "Aging": "13",
            "Raised by": "Ramakurup Gopinathan Saji Unnithan",
            "Pending with": "End User"
        },
        {
            "Title": "Brand Operations",
            "Value": "8750",
            "Aging": "17",
            "Raised by": "Ramakurup Gopinathan Saji Unnithan",
            "Pending with": "End User"
        },
        {
            "Title": "Summer Campaign Tier 1",
            "Value": "3673",
            "Aging": "41",
            "Raised by": "Mussaifah Mana Saeed Ahmed Alotaiba",
            "Pending with": "End User"
        }
    ];

    // Define table headers at the top level
    const headers = ['Title', 'Value', 'Aging', 'Raised by', 'Pending with'];
    
    // Apply CSS styling to match the dashboard theme
    function applyTableStyling() {
        // Get the table element
        const table = document.querySelector('#po-table');
        if (!table) return;
        
        // Apply table styling
        table.className = 'data-table';
        
        // Add card-view class for mobile
        if (isMobile) {
            table.classList.add('card-view');
        }
        
        table.style.width = '100%';
        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '0';
        table.style.color = 'white';
        table.style.borderRadius = '8px';
        table.style.overflow = 'hidden';
        
        // Style table header
        const thead = table.querySelector('thead');
        if (thead) {
            const headerRow = thead.querySelector('tr');
            if (headerRow) {
                headerRow.style.backgroundColor = 'rgba(42, 42, 42, 0.8)';
                
                const headerCells = headerRow.querySelectorAll('th');
                headerCells.forEach(cell => {
                    cell.style.padding = '14px 18px';
                    cell.style.textAlign = 'left';
                    cell.style.fontWeight = 'bold';
                    cell.style.color = '#eee';
                    cell.style.position = 'sticky';
                    cell.style.top = '0';
                    cell.style.zIndex = '10';
                    cell.style.backdropFilter = 'blur(5px)';
                    cell.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
                });
            }
        }
        
        // Style table body
        const tbody = table.querySelector('tbody');
        if (tbody) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(row => {
                row.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Only add hover effects for non-touch devices
                if (!isTouchDevice) {
                    // Add hover effect
                    row.addEventListener('mouseover', () => {
                        row.style.backgroundColor = 'rgba(42, 42, 42, 0.8)';
                        row.style.transform = 'translateX(5px)';
                        
                        // Change border color on hover
                        const cells = row.querySelectorAll('td');
                        cells.forEach(cell => {
                            cell.style.borderBottomColor = 'rgba(37, 99, 235, 0.2)';
                        });
                    });
                    
                    row.addEventListener('mouseout', () => {
                        row.style.backgroundColor = '';
                        row.style.transform = '';
                        
                        // Reset border color
                        const cells = row.querySelectorAll('td');
                        cells.forEach(cell => {
                            cell.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
                        });
                    });
                }
                
                // Style cells
                const cells = row.querySelectorAll('td');
                cells.forEach(cell => {
                    // Add data-label attribute for mobile card view
                    const columnIndex = Array.from(cell.parentNode.children).indexOf(cell);
                    const headerText = headers[columnIndex];
                    cell.setAttribute('data-label', headerText);
                    
                    // Adjust padding for mobile
                    cell.style.padding = isMobile ? '10px 12px' : '14px 18px';
                    cell.style.textAlign = 'left';
                    cell.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
                    cell.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    // For "Raised by" and "Pending with" columns, truncate long text on mobile
                    if ((headerText === 'Raised by' || headerText === 'Pending with') && isMobile) {
                        cell.style.maxWidth = '150px';
                        cell.style.whiteSpace = 'nowrap';
                        cell.style.overflow = 'hidden';
                        cell.style.textOverflow = 'ellipsis';
                        
                        // Add tooltip for truncated text
                        cell.title = cell.textContent;
                    }
                });
            });
        }
    }

    // Function to sort data
    function sortData(column) {
        // If clicking the same column, toggle sort direction
        if (currentSortColumn === column) {
            currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // New column, default to ascending
            currentSortColumn = column;
            currentSortDirection = 'asc';
        }
        
        // Create a copy of the data to sort
        const sortedData = [...poData];
        
        // Sort based on column
        sortedData.sort((a, b) => {
            let valueA, valueB;
            
            // Handle different data types
            if (column === 'Value') {
                // Convert string values to numbers for sorting
                valueA = parseFloat(a[column].replace(/,/g, '')) || 0;
                valueB = parseFloat(b[column].replace(/,/g, '')) || 0;
            } else if (column === 'Aging') {
                // Convert to numbers for sorting
                valueA = parseInt(a[column]) || 0;
                valueB = parseInt(b[column]) || 0;
            } else {
                // String comparison for text columns
                valueA = a[column].toLowerCase();
                valueB = b[column].toLowerCase();
            }
            
            // Compare based on direction
            if (currentSortDirection === 'asc') {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });
        
        return sortedData;
    }
    
    // Function to render the PO table with pagination
    function renderPOTable(sortedData = null) {
        const tableContainer = document.querySelector('#po-table').closest('.card-body');
        if (!tableContainer) return;
        
        // Clear existing content
        tableContainer.innerHTML = '';
        
        // Create table element
        const table = document.createElement('table');
        table.id = 'po-table';
        table.className = 'data-table';
        
        // Add card-view class for mobile
        if (isMobile) {
            table.classList.add('card-view');
        }
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        headers.forEach(headerText => {
            const th = document.createElement('th');
            
            // Create a container for header content to allow for better styling
            const headerContainer = document.createElement('div');
            headerContainer.style.display = 'flex';
            headerContainer.style.alignItems = 'center';
            headerContainer.style.justifyContent = 'space-between';
            headerContainer.style.width = '100%';
            
            // Add header text
            const textSpan = document.createElement('span');
            textSpan.textContent = headerText;
            headerContainer.appendChild(textSpan);
            
            // Create sort indicator container
            const sortContainer = document.createElement('div');
            sortContainer.style.display = 'flex';
            sortContainer.style.alignItems = 'center';
            sortContainer.style.marginLeft = '8px';
            
            // Add sort indicator to all headers
            const sortIndicator = document.createElement('span');
            
            if (currentSortColumn === headerText) {
                // Active sort state
                sortIndicator.innerHTML = currentSortDirection === 'asc' ? ' &#9650;' : ' &#9660;';
                sortIndicator.style.fontSize = '14px';
                sortIndicator.style.color = '#3498db'; // Bright blue for active sort
                
                // Add sort direction text
                const sortLabel = document.createElement('span');
                sortLabel.textContent = currentSortDirection === 'asc' ? ' A-Z' : ' Z-A';
                sortLabel.style.fontSize = '12px';
                sortLabel.style.marginLeft = '4px';
                sortLabel.style.color = '#3498db';
                sortContainer.appendChild(sortIndicator);
                sortContainer.appendChild(sortLabel);
            } else {
                // Inactive sort state - still show icons but more subtle
                sortIndicator.innerHTML = ' &#8645;'; // Up-down arrow
                sortIndicator.style.fontSize = '14px';
                sortIndicator.style.opacity = '0.5';
                sortContainer.appendChild(sortIndicator);
            }
            
            headerContainer.appendChild(sortContainer);
            th.appendChild(headerContainer);
            
            // Style the header
            th.style.cursor = 'pointer';
            th.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            th.style.userSelect = 'none'; // Prevent text selection
            
            // Add a subtle background to indicate it's interactive
            th.style.backgroundColor = currentSortColumn === headerText ? 
                'rgba(52, 152, 219, 0.15)' : 'rgba(42, 42, 42, 0.8)';
            
            // Add border to indicate active sort
            if (currentSortColumn === headerText) {
                th.style.borderBottom = '2px solid #3498db';
                th.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
            
            // Add tooltip
            th.title = `Click to sort by ${headerText}`;
            
            // Only add hover effects for non-touch devices
            if (!isTouchDevice) {
                // Enhanced hover effect
                th.addEventListener('mouseover', () => {
                    th.style.backgroundColor = currentSortColumn === headerText ? 
                        'rgba(52, 152, 219, 0.3)' : 'rgba(52, 152, 219, 0.2)';
                    th.style.transform = 'translateY(-2px)';
                    th.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                    
                    // Make the sort icon more visible on hover
                    const icon = th.querySelector('span > span');
                    if (icon) {
                        icon.style.opacity = '1';
                    }
                });
                
                th.addEventListener('mouseout', () => {
                    th.style.backgroundColor = currentSortColumn === headerText ? 
                        'rgba(52, 152, 219, 0.15)' : 'rgba(42, 42, 42, 0.8)';
                    th.style.transform = '';
                    th.style.boxShadow = currentSortColumn === headerText ? 
                        '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none';
                    
                    // Reset icon opacity if not the current sort column
                    if (currentSortColumn !== headerText) {
                        const icon = th.querySelector('span > span');
                        if (icon) {
                            icon.style.opacity = '0.5';
                        }
                    }
                });
            }
            
            // Add click event for sorting
            th.addEventListener('click', () => {
                const sortedData = sortData(headerText);
                renderPOTable(sortedData);
                handlePagination();
            });
            
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Use sorted data if provided, otherwise use original data
        const dataToUse = sortedData || poData;
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, dataToUse.length);
        const paginatedData = dataToUse.slice(startIndex, endIndex);
            
        // Add data rows for current page
        paginatedData.forEach(item => {
            const row = document.createElement('tr');
            
            // Title cell
            const titleCell = document.createElement('td');
            titleCell.textContent = item.Title;
            row.appendChild(titleCell);
            
            // Value cell
            const valueCell = document.createElement('td');
            const valueNum = parseFloat(item.Value.replace(/,/g, '')) || 0;
            valueCell.textContent = valueNum.toLocaleString() + ' AED';
            row.appendChild(valueCell);
            
            // Aging cell with status indicator
            const agingCell = document.createElement('td');
            const agingDays = parseInt(item.Aging);
            
            // Create status indicator span
            const statusIndicator = document.createElement('span');
            statusIndicator.style.display = 'inline-block';
            statusIndicator.style.width = '10px';
            statusIndicator.style.height = '10px';
            statusIndicator.style.borderRadius = '50%';
            statusIndicator.style.marginRight = '8px';
            
            // Set color based on aging days
            if (agingDays > 30) {
                // Red for high aging
                statusIndicator.style.backgroundColor = '#e74c3c';
                agingCell.style.color = '#e74c3c';
            } else if (agingDays < 15) {
                // Green for low aging
                statusIndicator.style.backgroundColor = '#2ecc71';
                agingCell.style.color = '#2ecc71';
            } else {
                // Yellow for medium aging
                statusIndicator.style.backgroundColor = '#f39c12';
                agingCell.style.color = '#f39c12';
            }
            
            agingCell.appendChild(statusIndicator);
            agingCell.appendChild(document.createTextNode(item.Aging));
            row.appendChild(agingCell);
            
            // Raised by cell
            const raisedByCell = document.createElement('td');
            raisedByCell.textContent = item["Raised by"];
            row.appendChild(raisedByCell);
            
            // Pending with cell
            const pendingWithCell = document.createElement('td');
            pendingWithCell.textContent = item["Pending with"];
            row.appendChild(pendingWithCell);
            
            // Add the row to the table
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        
        // Apply styling
        applyTableStyling();
    }

    // Function to handle pagination
    function handlePagination(sortedData = null) {
        const tableContainer = document.querySelector('#po-table').closest('.card-body');
        if (!tableContainer) return;
        
        // Create pagination container
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        paginationContainer.style.display = 'flex';
        paginationContainer.style.flexDirection = isMobile ? 'column' : 'row';
        paginationContainer.style.justifyContent = 'space-between';
        paginationContainer.style.alignItems = isMobile ? 'center' : 'center';
        paginationContainer.style.marginTop = '20px';
        paginationContainer.style.gap = isMobile ? '10px' : '0';
        
        // Use sorted data if provided, otherwise use original data
        const dataToUse = sortedData || poData;
        
        // Add pagination info
        const totalPages = Math.ceil(dataToUse.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(currentPage * itemsPerPage, dataToUse.length);
        
        const paginationInfo = document.createElement('div');
        paginationInfo.className = 'pagination-info';
        paginationInfo.textContent = `Showing ${startIndex} to ${endIndex} of ${dataToUse.length} entries`;
        paginationInfo.style.color = 'rgba(255, 255, 255, 0.7)';
        paginationInfo.style.fontSize = isMobile ? '0.8rem' : '0.9rem';
        paginationInfo.style.textAlign = isMobile ? 'center' : 'left';
        paginationInfo.style.marginBottom = isMobile ? '5px' : '0';
        paginationContainer.appendChild(paginationInfo);
        
        // Add pagination controls
        const paginationControls = document.createElement('div');
        paginationControls.className = 'pagination-controls';
        paginationControls.style.display = 'flex';
        paginationControls.style.gap = '10px';
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.className = 'pagination-button';
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.setAttribute('aria-label', 'Previous page');
        prevButton.style.padding = isMobile ? '10px 20px' : '8px 16px';
        prevButton.style.backgroundColor = currentPage === 1 ? 'rgba(52, 152, 219, 0.3)' : 'rgba(52, 152, 219, 0.7)';
        prevButton.style.color = 'white';
        prevButton.style.border = 'none';
        prevButton.style.borderRadius = '4px';
        prevButton.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
        prevButton.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        prevButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        prevButton.style.minWidth = isMobile ? '120px' : 'auto';
        prevButton.style.fontSize = isMobile ? '1rem' : 'inherit';
        
        // Only add hover effects for non-touch devices
        if (!isTouchDevice) {
            // Add hover effect
            prevButton.addEventListener('mouseover', () => {
                if (currentPage !== 1) {
                    prevButton.style.backgroundColor = 'rgba(52, 152, 219, 0.9)';
                    prevButton.style.transform = 'translateY(-2px)';
                    prevButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                }
            });
            
            prevButton.addEventListener('mouseout', () => {
                if (currentPage !== 1) {
                    prevButton.style.backgroundColor = 'rgba(52, 152, 219, 0.7)';
                    prevButton.style.transform = '';
                    prevButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                }
            });
        }
        
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                const sortedData = currentSortColumn ? sortData(currentSortColumn) : null;
                renderPOTable(sortedData);
                handlePagination(sortedData);
            }
        });
        
        paginationControls.appendChild(prevButton);
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.className = 'pagination-button';
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.setAttribute('aria-label', 'Next page');
        nextButton.style.padding = isMobile ? '10px 20px' : '8px 16px';
        nextButton.style.backgroundColor = currentPage === totalPages ? 'rgba(52, 152, 219, 0.3)' : 'rgba(52, 152, 219, 0.7)';
        nextButton.style.color = 'white';
        nextButton.style.border = 'none';
        nextButton.style.borderRadius = '4px';
        nextButton.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
        nextButton.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        nextButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        nextButton.style.minWidth = isMobile ? '120px' : 'auto';
        nextButton.style.fontSize = isMobile ? '1rem' : 'inherit';
        
        // Only add hover effects for non-touch devices
        if (!isTouchDevice) {
            // Add hover effect
            nextButton.addEventListener('mouseover', () => {
                if (currentPage !== totalPages) {
                    nextButton.style.backgroundColor = 'rgba(52, 152, 219, 0.9)';
                    nextButton.style.transform = 'translateY(-2px)';
                    nextButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                }
            });
            
            nextButton.addEventListener('mouseout', () => {
                if (currentPage !== totalPages) {
                    nextButton.style.backgroundColor = 'rgba(52, 152, 219, 0.7)';
                    nextButton.style.transform = '';
                    nextButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                }
            });
        }
        
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                const sortedData = currentSortColumn ? sortData(currentSortColumn) : null;
                renderPOTable(sortedData);
                handlePagination(sortedData);
            }
        });
        
        paginationControls.appendChild(nextButton);
        paginationContainer.appendChild(paginationControls);
        tableContainer.appendChild(paginationContainer);
    }
    
    // Add window resize listener to handle responsive layout changes
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        
        // Only re-render if mobile state has changed
        if (newIsMobile !== isMobile) {
            // Re-render the table with current data and pagination
            const sortedData = currentSortColumn ? sortData(currentSortColumn) : null;
            renderPOTable(sortedData);
            handlePagination(sortedData);
        }
    });
    
    // Initialize the table, pagination, and metric cards when the DOM is loaded
    renderPOTable();
    handlePagination();
    updateMetricCards();
    
    // Add CSS for mobile card view
    if (isMobile) {
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile card view styles */
            .data-table.card-view {
                border: none;
                background: transparent;
            }
            
            .data-table.card-view thead {
                display: none;
            }
            
            .data-table.card-view tbody tr {
                display: block;
                margin-bottom: 1rem;
                border-radius: 8px;
                background-color: rgba(30, 30, 30, 0.8);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .data-table.card-view td {
                display: flex;
                padding: 12px 15px !important;
                text-align: right !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            
            .data-table.card-view td:last-child {
                border-bottom: none;
            }
            
            .data-table.card-view td::before {
                content: attr(data-label);
                font-weight: bold;
                margin-right: auto;
                color: rgba(255, 255, 255, 0.7);
            }
        `;
        document.head.appendChild(style);
    }
});
