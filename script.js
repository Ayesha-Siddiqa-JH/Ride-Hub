// CRITICAL: Define navigateTo function FIRST before anything else
window.navigateTo = function(pageId) {
    try {
        console.log('🔵 Navigating to:', pageId);
        const allPages = document.querySelectorAll('.page');
        allPages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('✅ Navigation successful to:', pageId);
        } else {
            console.error('❌ Page not found:', pageId);
            alert('Page not found: ' + pageId);
        }
    } catch (error) {
        console.error('❌ Navigation error:', error);
        alert('Navigation error: ' + error.message);
    }
};
        
        // Database
        const database = {
            users: [],
            drivers: [
                { id: 'D001', name: 'Rajesh Kumar', email: 'rajesh@ridehub.com', phone: '9876543210', vehicleType: 'Auto', rating: 4.8, totalRides: 245, earnings: 12500, status: 'available', password: 'driver123', vehicleNumber: 'MH-12-AB-1234' },
                { id: 'D002', name: 'Priya Sharma', email: 'priya@ridehub.com', phone: '9876543211', vehicleType: 'Car', rating: 4.9, totalRides: 312, earnings: 18900, status: 'available', password: 'driver123', vehicleNumber: 'MH-12-CD-5678' },
                { id: 'D003', name: 'Amit Patel', email: 'amit@ridehub.com', phone: '9876543212', vehicleType: 'Bike', rating: 4.7, totalRides: 189, earnings: 8900, status: 'available', password: 'driver123', vehicleNumber: 'MH-12-EF-9012' },
                { id: 'D004', name: 'Sneha Reddy', email: 'sneha@ridehub.com', phone: '9876543213', vehicleType: 'Taxi', rating: 4.9, totalRides: 456, earnings: 23400, status: 'available', password: 'driver123', vehicleNumber: 'MH-12-GH-3456' },
                { id: 'D005', name: 'Vikram Singh', email: 'vikram@ridehub.com', phone: '9876543214', vehicleType: 'Lorry', rating: 4.6, totalRides: 128, earnings: 15600, status: 'available', password: 'driver123', vehicleNumber: 'MH-12-IJ-7890' }
            ],
            admins: [{ email: 'admin@ridehub.com', password: 'admin123', name: 'Admin' }],
            bookings: [],
            vehicles: [
                { type: 'Auto', ratePerKm: 12, category: 'passenger', icon: '🛺', features: '• 3 Passengers • Quick • Affordable', emoji: '🛺' },
                { type: 'Car', ratePerKm: 18, category: 'passenger', icon: '🚗', features: '• 4 Passengers • AC • Comfortable', emoji: '🚗' },
                { type: 'Bike', ratePerKm: 8, category: 'passenger', icon: '🏍️', features: '• 2 Passengers • Fast • Economical', emoji: '🏍️' },
                { type: 'Taxi', ratePerKm: 20, category: 'passenger', icon: '🚕', features: '• 4 Passengers • Professional • Metered', emoji: '🚕' },
                { type: 'Bus', ratePerKm: 15, category: 'passenger', icon: '🚌', features: '• 40+ Passengers • Group Travel • Economical', emoji: '🚌' },
                { type: 'Van', ratePerKm: 22, category: 'passenger', icon: '🚐', features: '• 8 Passengers • Spacious • Family', emoji: '🚐' },
                { type: 'Jeep', ratePerKm: 25, category: 'passenger', icon: '🚙', features: '• 6 Passengers • Off-road • Adventure', emoji: '🚙' },
                { type: 'Lorry', ratePerKm: 35, category: 'cargo', icon: '🚚', features: '• Heavy Goods • Long Distance • Cargo', emoji: '🚚' },
                { type: 'Tipper', ratePerKm: 45, category: 'construction', icon: '🚛', features: '• Construction • Dump Materials • Heavy', emoji: '🚛' },
                { type: 'JCB', ratePerKm: 60, category: 'construction', icon: '🚜', features: '• Excavation • Construction • Heavy Duty', emoji: '🚜' },
                { type: 'Tractor', ratePerKm: 40, category: 'construction', icon: '🚜', features: '• Farming • Heavy Loads • Agricultural', emoji: '🚜' },
                { type: 'Crane', ratePerKm: 80, category: 'construction', icon: '🏗️', features: '• Lifting • Construction • Industrial', emoji: '🏗️' },
                { type: 'Forklift', ratePerKm: 50, category: 'construction', icon: '🚜', features: '• Warehouse • Material Handling • Industrial', emoji: '🚜' },
                { type: 'Cement Mixer', ratePerKm: 55, category: 'construction', icon: '🚛', features: '• Construction • Concrete • Mixing', emoji: '🚛' },
                { type: 'Dump Truck', ratePerKm: 48, category: 'construction', icon: '🚛', features: '• Construction • Bulk Materials • Dumping', emoji: '🚛' },
                { type: 'Ambulance', ratePerKm: 30, category: 'emergency', icon: '🚑', features: '• Medical • Emergency • Priority', emoji: '🚑' },
                { type: 'Fire Truck', ratePerKm: 35, category: 'emergency', icon: '🚒', features: '• Fire Emergency • Rescue • Priority', emoji: '🚒' }
            ]
        };

        let currentUser = null;
        let currentRole = 'user';
        let selectedVehicle = null;
        let selectedPaymentMethod = null;

        // Generate OTP
        function generateOTP() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.background = type === 'success' ? '#10b981' : '#ef4444';
            notification.style.color = 'white';
            notification.classList.add('active');
            setTimeout(() => notification.classList.remove('active'), 3000);
        }

        // Also define as regular function for internal use
        function navigateTo(pageId) {
            window.navigateTo(pageId);
        }

        // Show section
        function showSection(sectionId) {
            const parent = document.querySelector('.page.active');
            parent.querySelectorAll('.section').forEach(section => section.style.display = 'none');
            document.getElementById(sectionId).style.display = 'block';
            
            // Update active nav
            parent.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        }

        // Update admin dashboard
        function updateAdminDashboard() {
            document.getElementById('admin-total-users').textContent = database.users.length;
            document.getElementById('admin-total-drivers').textContent = database.drivers.length;
            document.getElementById('admin-total-bookings').textContent = database.bookings.length;
            
            let totalRevenue = 0;
            database.bookings.forEach(booking => {
                const fare = parseFloat(booking.fare?.replace('₹', '') || booking.baseFare || 0);
                totalRevenue += fare;
            });
            
            document.getElementById('admin-total-revenue').textContent = `₹${totalRevenue.toFixed(2)}`;
            document.getElementById('admin-platform-earnings').textContent = `₹${(totalRevenue * 0.10).toFixed(2)}`;
            document.getElementById('admin-active-rides').textContent = database.bookings.filter(b => b.status === 'accepted' || b.status === 'in-progress').length;
            
            // Update bookings table with driver details
            const bookingsTable = document.getElementById('admin-bookings-table');
            if (bookingsTable) {
                if (database.bookings.length === 0) {
                    bookingsTable.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #6b7280;">No bookings yet</td></tr>';
                } else {
                    bookingsTable.innerHTML = database.bookings.map(booking => `
                        <tr>
                            <td><strong>${booking.id}</strong></td>
                            <td>${booking.userName || booking.userId}</td>
                            <td>${booking.vehicle}</td>
                            <td>${booking.distance} km</td>
                            <td><strong>${booking.fare}</strong></td>
                            <td>
                                <span class="status-badge status-${booking.status === 'completed' ? 'completed' : booking.status === 'pending' ? 'pending' : 'active'}">
                                    ${booking.status}
                                </span>
                            </td>
                        </tr>
                    `).join('');
                }
            }
            
            // Update Chart.js if charts exist
            updateAdminCharts();
            
            // Update tables
            updateAdminUsersTable();
            updateAdminDriversTable();
        }
        
        let bookingsChart, revenueChart, vehicleChart;
        
        function updateAdminCharts() {
            // Bookings by Status Chart
            const bookingsCtx = document.getElementById('bookingsChart');
            if (bookingsCtx) {
                const statusCounts = {
                    pending: database.bookings.filter(b => b.status === 'pending').length,
                    accepted: database.bookings.filter(b => b.status === 'accepted').length,
                    'in-progress': database.bookings.filter(b => b.status === 'in-progress').length,
                    completed: database.bookings.filter(b => b.status === 'completed').length,
                    cancelled: database.bookings.filter(b => b.status === 'cancelled').length
                };
                
                if (bookingsChart) bookingsChart.destroy();
                bookingsChart = new Chart(bookingsCtx, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(statusCounts),
                        datasets: [{
                            data: Object.values(statusCounts),
                            backgroundColor: [
                                'rgba(245, 158, 11, 0.8)',
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(139, 92, 246, 0.8)',
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(239, 68, 68, 0.8)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true
                    }
                });
            }
            
            // Revenue Chart
            const revenueCtx = document.getElementById('revenueChart');
            if (revenueCtx) {
                const last7Days = [];
                const revenueData = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    last7Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                    
                    const dayBookings = database.bookings.filter(b => {
                        const bookingDate = new Date(b.date);
                        return bookingDate.toDateString() === date.toDateString();
                    });
                    revenueData.push(dayBookings.reduce((sum, b) => sum + (b.baseFare || 0), 0));
                }
                
                if (revenueChart) revenueChart.destroy();
                revenueChart = new Chart(revenueCtx, {
                    type: 'line',
                    data: {
                        labels: last7Days,
                        datasets: [{
                            label: 'Revenue (₹)',
                            data: revenueData,
                            borderColor: 'rgb(102, 126, 234)',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
            
            // Vehicle Type Distribution
            const vehicleCtx = document.getElementById('vehicleChart');
            if (vehicleCtx) {
                const vehicleCounts = {};
                database.bookings.forEach(booking => {
                    vehicleCounts[booking.vehicle] = (vehicleCounts[booking.vehicle] || 0) + 1;
                });
                
                if (vehicleChart) vehicleChart.destroy();
                vehicleChart = new Chart(vehicleCtx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(vehicleCounts),
                        datasets: [{
                            label: 'Bookings',
                            data: Object.values(vehicleCounts),
                            backgroundColor: 'rgba(102, 126, 234, 0.8)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
        
        // Update users table (called from updateAdminDashboard)
        function updateAdminUsersTable() {
            const usersTable = document.getElementById('admin-users-table');
            if (!usersTable) return;
            
            if (database.users.length === 0) {
                usersTable.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #6b7280;">No users registered yet</td></tr>';
            } else {
                usersTable.innerHTML = database.users.map((user, index) => `
                    <tr>
                        <td>#U${String(index + 1).padStart(3, '0')}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.totalBookings || 0}</td>
                        <td><span class="status-badge status-active">Active</span></td>
                    </tr>
                `).join('');
            }
        }
        
        // Update drivers table (called from updateAdminDashboard)
        function updateAdminDriversTable() {
            const driversTable = document.getElementById('admin-drivers-table');
            if (!driversTable) return;
            if (database.drivers.length === 0) {
                driversTable.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #6b7280;">No drivers registered yet</td></tr>';
            } else {
                driversTable.innerHTML = database.drivers.map((driver, index) => `
                    <tr>
                        <td>#D${String(index + 1).padStart(3, '0')}</td>
                        <td>${driver.name}</td>
                        <td>${driver.email}</td>
                        <td>${driver.vehicleType || 'Auto'}</td>
                        <td>${driver.totalRides || 0}</td>
                        <td>₹${driver.earnings || 0}</td>
                        <td>${driver.rating || 5.0}⭐</td>
                    </tr>
                `).join('');
            }
        }

        // Render vehicles dynamically
        function renderVehicles(filteredVehicles = null) {
            const vehicleGrid = document.getElementById('vehicle-grid');
            if (!vehicleGrid) return;
            
            const vehicles = filteredVehicles || database.vehicles;
            vehicleGrid.innerHTML = vehicles.map(vehicle => `
                <div class="vehicle-card tilt-effect" data-vehicle="${vehicle.type}" data-category="${vehicle.category}">
                    <div class="vehicle-icon" style="font-size: 5rem; display: flex; align-items: center; justify-content: center;">
                        ${vehicle.emoji}
                    </div>
                    <h3>${vehicle.type}</h3>
                    <p class="price">₹${vehicle.ratePerKm}/km</p>
                    <p class="features">${vehicle.features}</p>
                </div>
            `).join('');
            
            // Add click handlers and 3D tilt effects
            vehicleGrid.querySelectorAll('.vehicle-card').forEach(card => {
                card.addEventListener('click', function() {
                    selectedVehicle = this.getAttribute('data-vehicle');
                    document.getElementById('selected-vehicle').textContent = selectedVehicle;
                    document.getElementById('booking-modal').classList.add('active');
                });
                
                // 3D Tilt Effect
                card.addEventListener('mousemove', function(e) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.03)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    card.style.transform = '';
                });
            });
        }
        
        // Search and filter vehicles
        function setupVehicleSearch() {
            const searchInput = document.getElementById('vehicle-search');
            const filterSelect = document.getElementById('vehicle-filter');
            const suggestionsDiv = document.getElementById('search-suggestions');
            
            if (!searchInput || !filterSelect) return;
            
            let searchTimeout;
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    const query = this.value.toLowerCase();
                    const category = filterSelect.value;
                    
                    let filtered = database.vehicles;
                    
                    if (category !== 'all') {
                        filtered = filtered.filter(v => v.category === category);
                    }
                    
                    if (query) {
                        filtered = filtered.filter(v => 
                            v.type.toLowerCase().includes(query) ||
                            v.features.toLowerCase().includes(query)
                        );
                        
                        // Show suggestions
                        if (suggestionsDiv && query.length > 0) {
                            const suggestions = database.vehicles
                                .filter(v => v.type.toLowerCase().startsWith(query))
                                .slice(0, 5);
                            
                            if (suggestions.length > 0) {
                                suggestionsDiv.innerHTML = suggestions.map(v => `
                                    <div style="padding: 0.75rem 1rem; cursor: pointer; border-bottom: 1px solid var(--color-border); transition: background 0.2s;" 
                                         onmouseover="this.style.background='rgba(102, 126, 234, 0.1)'"
                                         onmouseout="this.style.background='transparent'"
                                         onclick="document.getElementById('vehicle-search').value='${v.type}'; document.getElementById('search-suggestions').style.display='none'; renderVehicles([v]);">
                                        ${v.emoji} ${v.type} - ₹${v.ratePerKm}/km
                                    </div>
                                `).join('');
                                suggestionsDiv.style.display = 'block';
                            } else {
                                suggestionsDiv.style.display = 'none';
                            }
                        }
                    } else {
                        if (suggestionsDiv) suggestionsDiv.style.display = 'none';
                    }
                    
                    renderVehicles(filtered);
                }, 300);
            });
            
            filterSelect.addEventListener('change', function() {
                const query = searchInput.value.toLowerCase();
                let filtered = database.vehicles;
                
                if (this.value !== 'all') {
                    filtered = filtered.filter(v => v.category === this.value);
                }
                
                if (query) {
                    filtered = filtered.filter(v => 
                        v.type.toLowerCase().includes(query) ||
                        v.features.toLowerCase().includes(query)
                    );
                }
                
                renderVehicles(filtered);
            });
            
            // Close suggestions on outside click
            document.addEventListener('click', function(e) {
                if (suggestionsDiv && !searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                    suggestionsDiv.style.display = 'none';
                }
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ RideHub initialized');
            console.log('✅ JavaScript is working!');
            
            // Ensure landing page is visible on load
            const landingPage = document.getElementById('landing');
            if (landingPage) {
                landingPage.classList.add('active');
            }
            
            // Render vehicles and setup search
            renderVehicles();
            setupVehicleSearch();
            
            // Setup auto-calculate distance
            setupAutoCalculate();
            
            // Generate OTP
            const otpEl = document.getElementById('generated-otp');
            if (otpEl) {
                otpEl.textContent = generateOTP();
            }
            
            // Get Started button - Use onclick for immediate execution
            function attachGetStartedButton() {
                const getStartedBtn = document.getElementById('getStartedBtn');
                if (getStartedBtn) {
                    getStartedBtn.onclick = function(e) {
                        if (e) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        console.log('✅ Get Started button clicked!');
                        console.log('✅ navigateTo function exists:', typeof window.navigateTo);
                        try {
                            if (typeof window.navigateTo === 'function') {
                                window.navigateTo('auth');
                            } else {
                                alert('Navigation function not loaded! Please refresh the page.');
                                console.error('❌ navigateTo is not a function!');
                            }
                        } catch (err) {
                            console.error('❌ Navigation error:', err);
                            alert('Error navigating: ' + err.message);
                        }
                        return false;
                    };
                    console.log('✅ Get Started button handler attached');
                } else {
                    console.error('❌ Get Started button not found!');
                }
            }
            
            // Attach button handler
            attachGetStartedButton();
            
            // Role selection - Ensure it works
            const roleButtons = document.querySelectorAll('.role-btn');
            if (roleButtons.length > 0) {
                roleButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const role = this.getAttribute('data-role');
                        if (role) {
                            currentRole = role;
                            document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
                            this.classList.add('active');
                            console.log('✅ Role changed to:', currentRole);
                        }
                    });
                });
                console.log('✅ Role buttons initialized:', roleButtons.length);
            } else {
                console.error('❌ Role buttons not found!');
            }
            
            // Sign up
            const signupForm = document.getElementById('signup-form');
            if (signupForm) {
                // Remove existing listeners
                const newForm = signupForm.cloneNode(true);
                signupForm.parentNode.replaceChild(newForm, signupForm);
                
                newForm.addEventListener('submit', function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    
                    const name = document.getElementById('signup-name').value.trim();
                    const email = document.getElementById('signup-email').value.trim();
                    const phone = document.getElementById('signup-phone').value.trim();
                    const password = document.getElementById('signup-password').value;
                    const otp = document.getElementById('signup-otp').value.trim();
                    const generatedOTP = document.getElementById('generated-otp').textContent.trim();
                    
                    if (!name || !email || !phone || !password || !otp) {
                        showNotification('Please fill all fields!', 'error');
                        return false;
                    }
                    
                    if (currentRole === 'admin') {
                        showNotification('Admin accounts cannot be created!', 'error');
                        return false;
                    }
                    
                    if (otp !== generatedOTP) {
                        showNotification('Invalid OTP!', 'error');
                        const otpEl = document.getElementById('generated-otp');
                        if (otpEl) otpEl.textContent = generateOTP();
                        return false;
                    }
                    
                    const existingUser = database.users.find(u => u.email === email);
                    const existingDriver = database.drivers.find(d => d.email === email);
                    
                    if (existingUser || existingDriver) {
                        showNotification('Account exists! Please sign in.', 'error');
                        const signinEmail = document.getElementById('signin-email');
                        if (signinEmail) signinEmail.value = email;
                        return false;
                    }
                    
                    const user = { name, email, phone, password, totalBookings: 0, totalRides: 0, earnings: 0, rating: 5.0, vehicleType: 'Auto' };
                    
                    if (currentRole === 'user') {
                        database.users.push(user);
                    } else if (currentRole === 'driver') {
                        database.drivers.push(user);
                    }
                    
                    showNotification('✅ Registration successful! Please sign in.', 'success');
                    const otpEl = document.getElementById('generated-otp');
                    if (otpEl) otpEl.textContent = generateOTP();
                    newForm.reset();
                    const signinEmail = document.getElementById('signin-email');
                    const signinPassword = document.getElementById('signin-password');
                    if (signinEmail) signinEmail.value = email;
                    if (signinPassword) signinPassword.value = password;
                    
                    // DO NOT navigate away - stay on auth page
                    return false;
                });
                console.log('✅ Signup form initialized');
            } else {
                console.error('❌ Signup form not found!');
            }
            
            // Sign in
            const signinForm = document.getElementById('signin-form');
            if (signinForm) {
                // Remove existing listeners
                const newForm = signinForm.cloneNode(true);
                signinForm.parentNode.replaceChild(newForm, signinForm);
                
                newForm.addEventListener('submit', function(e) {
                    if (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    
                    const email = document.getElementById('signin-email').value.trim();
                    const password = document.getElementById('signin-password').value;
                    
                    if (!email || !password) {
                        showNotification('Please fill all fields!', 'error');
                        return false;
                    }
                    
                    let user = null;
                    let dashboard = '';
                    
                    if (currentRole === 'user') {
                        user = database.users.find(u => u.email === email && u.password === password);
                        dashboard = 'user-dashboard';
                    } else if (currentRole === 'driver') {
                        user = database.drivers.find(d => d.email === email && d.password === password);
                        dashboard = 'driver-dashboard';
                    } else if (currentRole === 'admin') {
                        user = database.admins.find(a => a.email === email && a.password === password);
                        dashboard = 'admin-dashboard';
                    }
                    
                    if (user) {
                        currentUser = user;
                        showNotification(`Welcome, ${user.name}!`, 'success');
                        console.log('✅ Sign in successful, navigating to:', dashboard);
                        navigateTo(dashboard);
                        
                        // Update dashboard after a short delay to ensure page is visible
                        setTimeout(() => {
                            if (currentRole === 'user') {
                                const userNameEl = document.getElementById('user-name');
                                if (userNameEl) userNameEl.textContent = user.name;
                                const profileNameEl = document.getElementById('profile-name');
                                if (profileNameEl) profileNameEl.value = user.name;
                                const profileEmailEl = document.getElementById('profile-email');
                                if (profileEmailEl) profileEmailEl.value = user.email;
                                const profilePhoneEl = document.getElementById('profile-phone');
                                if (profilePhoneEl) profilePhoneEl.value = user.phone;
                                updateUserBookings();
                            } else if (currentRole === 'driver') {
                                updateDriverDashboard();
                            } else if (currentRole === 'admin') {
                                updateAdminDashboard();
                            }
                        }, 100);
                    } else {
                        showNotification('Invalid credentials!', 'error');
                        console.log('❌ Sign in failed for:', email, 'Role:', currentRole);
                    }
                    
                    return false;
                });
                console.log('✅ Signin form initialized');
            } else {
                console.error('❌ Signin form not found!');
            }
            
            // Vehicle selection - updated to work with dynamically rendered vehicles
            document.addEventListener('click', function(e) {
                const vehicleCard = e.target.closest('.vehicle-card');
                if (vehicleCard) {
                    selectedVehicle = vehicleCard.getAttribute('data-vehicle');
                    const selectedVehicleEl = document.getElementById('selected-vehicle');
                    if (selectedVehicleEl) {
                        selectedVehicleEl.textContent = selectedVehicle;
                    }
                    const bookingModal = document.getElementById('booking-modal');
                    if (bookingModal) {
                        bookingModal.classList.add('active');
                        // Reset wizard to step 1
                        currentStep = 1;
                        showStep(1);
                        // Clear previous values
                        const pickupInput = document.getElementById('pickup-location');
                        const dropInput = document.getElementById('drop-location');
                        const distanceInput = document.getElementById('distance');
                        if (pickupInput) pickupInput.value = '';
                        if (dropInput) dropInput.value = '';
                        if (distanceInput) distanceInput.value = '';
                        // Setup auto-calculate when modal opens
                        setTimeout(() => setupAutoCalculate(), 100);
                    }
                }
            });
            
            // Close booking modal
            document.getElementById('close-booking-modal').addEventListener('click', () => {
                document.getElementById('booking-modal').classList.remove('active');
            });
            
            // Detect location
            document.getElementById('detect-location-btn').addEventListener('click', () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        reverseGeocode(lat, lon);

                        if (typeof google !== 'undefined' && map) {
                            const latlng = new google.maps.LatLng(lat, lon);
                            setMapToPlace(latlng);
                        }

                        showNotification('Location detected!', 'success');
                    }, (err) => {
                        showNotification('Unable to access location: ' + err.message, 'error');
                    });
                } else {
                    showNotification('Geolocation not supported by your browser', 'error');
                }
            });
            
            // Auto-calculate distance when both locations are filled
            var autoCalculateSetup = false;

            function setupAutoCalculate() {
                if (autoCalculateSetup) return; // Prevent duplicate listeners
                
                const pickupInput = document.getElementById('pickup-location');
                const dropInput = document.getElementById('drop-location');
                
                if (pickupInput && dropInput) {
                    autoCalculateSetup = true;
                    // Calculate on input change
                    pickupInput.addEventListener('input', function() {
                        autoCalculateDistance();
                    });
                    
                    dropInput.addEventListener('input', function() {
                        autoCalculateDistance();
                    });
                    
                    // Also calculate on blur
                    pickupInput.addEventListener('blur', function() {
                        autoCalculateDistance();
                    });
                    
                    dropInput.addEventListener('blur', function() {
                        autoCalculateDistance();
                    });
                }
            }
            
            function autoCalculateDistance() {
                const pickup = document.getElementById('pickup-location')?.value.trim();
                const drop = document.getElementById('drop-location')?.value.trim();
                const distanceInput = document.getElementById('distance');
                
                if (pickup && drop) {
                    const distance = calculateDistance(pickup, drop);
                    if (distanceInput) {
                        distanceInput.value = distance.toFixed(1);
                        
                        // Auto-calculate fare if vehicle is selected
                        if (selectedVehicle) {
                            const vehicle = database.vehicles.find(v => v.type === selectedVehicle);
                            if (vehicle && distance > 0) {
                                const baseFare = distance * vehicle.ratePerKm;
                                const platformFee = baseFare * 0.05;
                                const totalFare = baseFare + platformFee;
                                
                                const baseFareEl = document.getElementById('base-fare');
                                const platformFeeEl = document.getElementById('platform-fee');
                                const totalFareEl = document.getElementById('total-fare');
                                
                                if (baseFareEl) baseFareEl.textContent = `₹${baseFare.toFixed(2)}`;
                                if (platformFeeEl) platformFeeEl.textContent = `₹${platformFee.toFixed(2)}`;
                                if (totalFareEl) totalFareEl.textContent = `₹${totalFare.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
            
            // Calculate fare when distance changes
            document.getElementById('distance')?.addEventListener('input', function() {
                const distance = parseFloat(this.value) || 0;
                const vehicle = database.vehicles.find(v => v.type === selectedVehicle);
                
                if (vehicle && distance > 0) {
                    const baseFare = distance * vehicle.ratePerKm;
                    const platformFee = baseFare * 0.05;
                    const totalFare = baseFare + platformFee;
                    
                    document.getElementById('base-fare').textContent = `₹${baseFare.toFixed(2)}`;
                    document.getElementById('platform-fee').textContent = `₹${platformFee.toFixed(2)}`;
                    document.getElementById('total-fare').textContent = `₹${totalFare.toFixed(2)}`;
                }
            });
            
            // Payment selection
            document.querySelectorAll('.payment-option').forEach(option => {
                option.addEventListener('click', function() {
                    selectedPaymentMethod = this.getAttribute('data-payment');
                    document.getElementById('selected-payment').value = selectedPaymentMethod;
                    
                    document.querySelectorAll('.payment-option').forEach(opt => {
                        opt.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                        opt.style.transform = 'scale(1)';
                    });
                    
                    this.style.borderColor = '#667eea';
                    this.style.transform = 'scale(1.05)';
                    
                    showNotification(`${selectedPaymentMethod.toUpperCase()} selected`, 'success');
                });
            });
            
            // Multi-step wizard functions
            let currentStep = 1;
            
            // Calculate distance between two locations (simplified - using random realistic distances)
            function calculateDistance(pickup, drop) {
                // Common city distances (in km) - simplified calculation
                const cityDistances = {
                    'hassan-bengaluru': 180,
                    'bengaluru-hassan': 180,
                    'mysore-bengaluru': 150,
                    'bengaluru-mysore': 150,
                    'mangalore-bengaluru': 350,
                    'bengaluru-mangalore': 350,
                    'delhi-mumbai': 1400,
                    'mumbai-delhi': 1400,
                    'mumbai-pune': 150,
                    'pune-mumbai': 150
                };
                
                const key1 = `${pickup.toLowerCase()}-${drop.toLowerCase()}`;
                const key2 = `${drop.toLowerCase()}-${pickup.toLowerCase()}`;
                
                if (cityDistances[key1]) {
                    return cityDistances[key1];
                }
                if (cityDistances[key2]) {
                    return cityDistances[key2];
                }
                
                // If no predefined distance, generate a random realistic distance (10-200 km)
                return Math.floor(Math.random() * 190) + 10;
            }
            
            window.nextStep = function(step) {
                if (step === 2) {
                    const pickup = document.getElementById('pickup-location')?.value.trim() || '';
                    const drop = document.getElementById('drop-location')?.value.trim() || '';
                    
                    if (!pickup || !drop) {
                        showNotification('Please enter both pickup and drop locations!', 'error');
                        return;
                    }
                    
                    // Auto-calculate distance if not provided
                    let distance = parseFloat(document.getElementById('distance')?.value || 0);
                    if (!distance || distance <= 0) {
                        distance = calculateDistance(pickup, drop);
                        const distanceInput = document.getElementById('distance');
                        if (distanceInput) {
                            distanceInput.value = distance.toFixed(1);
                        }
                    }
                    
                    // Calculate fare
                    const vehicle = database.vehicles.find(v => v.type === selectedVehicle);
                    if (vehicle && distance > 0) {
                        const baseFare = distance * vehicle.ratePerKm;
                        const platformFee = baseFare * 0.05;
                        const totalFare = baseFare + platformFee;
                        
                        const baseFareEl = document.getElementById('base-fare');
                        const platformFeeEl = document.getElementById('platform-fee');
                        const totalFareEl = document.getElementById('total-fare');
                        
                        if (baseFareEl) baseFareEl.textContent = `₹${baseFare.toFixed(2)}`;
                        if (platformFeeEl) platformFeeEl.textContent = `₹${platformFee.toFixed(2)}`;
                        if (totalFareEl) totalFareEl.textContent = `₹${totalFare.toFixed(2)}`;
                    }
                } else if (step === 4) {
                    // Update summary
                    document.getElementById('summary-vehicle').textContent = selectedVehicle;
                    document.getElementById('summary-pickup').textContent = document.getElementById('pickup-location').value;
                    document.getElementById('summary-drop').textContent = document.getElementById('drop-location').value;
                    document.getElementById('summary-distance').textContent = document.getElementById('distance').value + ' km';
                    document.getElementById('summary-payment').textContent = selectedPaymentMethod ? selectedPaymentMethod.toUpperCase() : 'Not selected';
                    document.getElementById('summary-total').textContent = document.getElementById('total-fare').textContent;
                    
                    // Assign driver
                    assignDriver();
                }
                
                showStep(step);
            };
            
            window.prevStep = function(step) {
                showStep(step);
            };
            
            function showStep(step) {
                currentStep = step;
                document.querySelectorAll('.booking-wizard-step').forEach(s => s.style.display = 'none');
                document.getElementById(`step-${step}`).style.display = 'block';
                
                // Update progress
                const progress = ((step - 1) / 3) * 100;
                document.getElementById('progress-line').style.width = progress + '%';
                
                document.querySelectorAll('.booking-step').forEach((s, i) => {
                    const stepNum = i + 1;
                    const stepDiv = s.querySelector('div');
                    if (stepNum <= step) {
                        s.classList.add('active');
                        stepDiv.style.background = 'var(--gradient-primary)';
                        stepDiv.style.color = 'white';
                    } else {
                        s.classList.remove('active');
                        stepDiv.style.background = 'var(--color-border)';
                        stepDiv.style.color = 'var(--color-text-muted)';
                    }
                });
            }
            
            function assignDriver() {
                const driverAssignment = document.getElementById('driver-assignment');
                driverAssignment.innerHTML = '<div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div><p style="color: var(--color-text-muted);">Finding nearby driver...</p>';
                
                setTimeout(() => {
                    // Find available driver for the vehicle type
                    const availableDrivers = database.drivers.filter(d => 
                        d.status === 'available' && 
                        (d.vehicleType === selectedVehicle || selectedVehicle === 'Auto' || selectedVehicle === 'Car' || selectedVehicle === 'Taxi')
                    );
                    
                    if (availableDrivers.length === 0) {
                        // If no exact match, get any available driver
                        const anyDriver = database.drivers.find(d => d.status === 'available');
                        if (anyDriver) {
                            displayDriver(anyDriver);
                        } else {
                            driverAssignment.innerHTML = '<div style="color: var(--color-danger);">No drivers available at the moment. Please try again later.</div>';
                        }
                    } else {
                        // Randomly select a driver
                        const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
                        displayDriver(randomDriver);
                    }
                }, 1500);
            }
            
            function displayDriver(driver) {
                const driverAssignment = document.getElementById('driver-assignment');
                driverAssignment.innerHTML = `
                    <div style="text-align: center;">
                        <div style="width: 100px; height: 100px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 3rem; color: white;">
                            👨‍✈️
                        </div>
                        <h3 style="margin-bottom: 0.5rem;">${driver.name}</h3>
                        <p style="color: var(--color-text-muted); margin-bottom: 0.5rem;">${driver.vehicleType} • ${driver.vehicleNumber}</p>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span style="font-size: 1.2rem;">⭐</span>
                            <strong>${driver.rating}</strong>
                            <span style="color: var(--color-text-muted);">(${driver.totalRides} rides)</span>
                        </div>
                        <p style="color: var(--color-success); font-weight: 600;">📞 ${driver.phone}</p>
                    </div>
                `;
                assignedDriver = driver;
            }
            
            let assignedDriver = null;
            
            window.confirmBooking = function() {
                if (!selectedPaymentMethod) {
                    showNotification('Please select a payment method!', 'error');
                    return;
                }
                
                if (!assignedDriver) {
                    showNotification('Driver assignment in progress. Please wait...', 'error');
                    return;
                }
                
                const booking = {
                    id: `BK${String(database.bookings.length + 1).padStart(4, '0')}`,
                    vehicle: selectedVehicle,
                    pickup: document.getElementById('pickup-location').value,
                    drop: document.getElementById('drop-location').value,
                    distance: parseFloat(document.getElementById('distance').value),
                    fare: document.getElementById('total-fare').textContent,
                    baseFare: parseFloat(document.getElementById('base-fare').textContent.replace('₹', '')),
                    platformFee: parseFloat(document.getElementById('platform-fee').textContent.replace('₹', '')),
                    paymentMethod: selectedPaymentMethod,
                    date: new Date().toLocaleString(),
                    status: 'pending', // pending, accepted, in-progress, completed, cancelled
                    userId: currentUser?.email,
                    userName: currentUser?.name,
                    driverId: assignedDriver.id,
                    driverName: assignedDriver.name,
                    driverPhone: assignedDriver.phone,
                    driverRating: assignedDriver.rating,
                    driverVehicle: assignedDriver.vehicleType,
                    driverVehicleNumber: assignedDriver.vehicleNumber,
                    paymentStatus: 'pending'
                };
                
                database.bookings.push(booking);
                
                if (currentUser) {
                    currentUser.totalBookings = (currentUser.totalBookings || 0) + 1;
                }
                
                // Update driver status
                assignedDriver.status = 'on-ride';
                
                showNotification(`💳 Processing payment via ${selectedPaymentMethod}...`, 'success');
                setTimeout(() => {
                    booking.paymentStatus = 'completed';
                    showNotification(`✅ Booking confirmed: ${booking.id}`, 'success');
                    setTimeout(() => {
                        showNotification(`🚗 Driver ${assignedDriver.name} has been assigned!`, 'success');
                        document.getElementById('booking-modal').classList.remove('active');
                        resetBookingWizard();
                        updateAllDashboards();
                        updateUserBookings();
                    }, 1500);
                }, 2000);
            };
            
            function resetBookingWizard() {
                currentStep = 1;
                selectedPaymentMethod = null;
                assignedDriver = null;
                showStep(1);
                document.getElementById('pickup-location').value = '';
                document.getElementById('drop-location').value = '';
                document.getElementById('distance').value = '';
            }
            
            window.closeBookingModal = function() {
                document.getElementById('booking-modal').classList.remove('active');
                resetBookingWizard();
            };
            
            // Update all dashboards
            function updateAllDashboards() {
                updateAdminDashboard();
                updateDriverDashboard();
                updateUserBookings();
            }
            
            // Update user bookings with enhanced cards
            function updateUserBookings() {
                const bookingsTable = document.getElementById('user-bookings-table');
                if (!bookingsTable) return;
                
                const userBookings = database.bookings.filter(b => b.userId === currentUser?.email);
                
                if (userBookings.length === 0) {
                    bookingsTable.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #6b7280;">No bookings yet</td></tr>';
                } else {
                    bookingsTable.innerHTML = userBookings.map(booking => `
                        <tr style="background: rgba(255, 255, 255, 0.5); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border-radius: 8px; margin-bottom: 0.5rem;">
                            <td><strong>${booking.id}</strong></td>
                            <td>${booking.vehicle}</td>
                            <td>${booking.date}</td>
                            <td>${booking.distance} km</td>
                            <td><strong>${booking.fare}</strong></td>
                            <td>
                                <span class="status-badge status-${booking.status === 'completed' ? 'completed' : booking.status === 'pending' ? 'pending' : 'active'}">
                                    ${booking.status}
                                </span>
                            </td>
                        </tr>
                    `).join('');
                }
            }
            
            // Update driver dashboard
            function updateDriverDashboard() {
                if (currentRole !== 'driver') return;
                
                const driverBookings = database.bookings.filter(b => b.driverId === currentUser?.id);
                const pendingBookings = driverBookings.filter(b => b.status === 'pending');
                const completedBookings = driverBookings.filter(b => b.status === 'completed');
                
                // Update stats
                const statsCards = document.querySelectorAll('#driver-home .stat-card .stat-value');
                if (statsCards.length >= 4) {
                    statsCards[0].textContent = driverBookings.length;
                    statsCards[1].textContent = `₹${driverBookings.reduce((sum, b) => sum + (b.baseFare || 0), 0).toFixed(2)}`;
                    statsCards[2].textContent = `${currentUser?.rating || 5.0}⭐`;
                    statsCards[3].textContent = pendingBookings.length;
                }
                
                // Update available rides table
                const availableRidesTable = document.querySelector('#driver-home table tbody');
                if (availableRidesTable) {
                    if (pendingBookings.length === 0) {
                        availableRidesTable.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #6b7280;">No ride requests available</td></tr>';
                    } else {
                        availableRidesTable.innerHTML = pendingBookings.map(booking => `
                            <tr>
                                <td>${booking.id}</td>
                                <td>${booking.pickup}</td>
                                <td>${booking.drop}</td>
                                <td>${booking.distance} km</td>
                                <td><strong>${booking.fare}</strong></td>
                                <td>
                                    <button class="btn-submit" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-right: 0.5rem;" onclick="acceptRide('${booking.id}')">✅ Accept</button>
                                    <button class="btn-submit" style="padding: 0.5rem 1rem; font-size: 0.9rem; background: var(--color-danger);" onclick="rejectRide('${booking.id}')">❌ Reject</button>
                                </td>
                            </tr>
                        `).join('');
                    }
                }
                
                // Update completed rides
                const completedRidesTable = document.querySelector('#driver-rides table tbody');
                if (completedRidesTable) {
                    if (completedBookings.length === 0) {
                        completedRidesTable.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #6b7280;">No completed rides yet</td></tr>';
                    } else {
                        completedRidesTable.innerHTML = completedBookings.map(booking => `
                            <tr>
                                <td>${booking.id}</td>
                                <td>${booking.date}</td>
                                <td>${booking.distance} km</td>
                                <td>${booking.fare}</td>
                                <td>₹${(booking.baseFare * 0.95).toFixed(2)}</td>
                                <td>${booking.driverRating || 5.0}⭐</td>
                            </tr>
                        `).join('');
                    }
                }
            }
            
            // Driver accept/reject functions
            window.acceptRide = function(bookingId) {
                const booking = database.bookings.find(b => b.id === bookingId);
                if (booking) {
                    booking.status = 'accepted';
                    const driver = database.drivers.find(d => d.id === booking.driverId);
                    if (driver) {
                        driver.status = 'on-ride';
                    }
                    showNotification(`✅ Ride ${bookingId} accepted!`, 'success');
                    updateDriverDashboard();
                    updateAdminDashboard();
                }
            };
            
            window.rejectRide = function(bookingId) {
                const booking = database.bookings.find(b => b.id === bookingId);
                if (booking) {
                    // Find another available driver
                    const availableDrivers = database.drivers.filter(d => 
                        d.status === 'available' && d.id !== booking.driverId
                    );
                    
                    if (availableDrivers.length > 0) {
                        const newDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
                        booking.driverId = newDriver.id;
                        booking.driverName = newDriver.name;
                        booking.driverPhone = newDriver.phone;
                        booking.driverRating = newDriver.rating;
                        booking.driverVehicle = newDriver.vehicleType;
                        booking.driverVehicleNumber = newDriver.vehicleNumber;
                        showNotification(`Ride reassigned to ${newDriver.name}`, 'success');
                    } else {
                        booking.status = 'cancelled';
                        showNotification(`Ride ${bookingId} cancelled - no drivers available`, 'error');
                    }
                    updateDriverDashboard();
                    updateAdminDashboard();
                }
            };
            
            // Sidebar navigation
            document.querySelectorAll('.sidebar-nav a[data-section]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('data-section');
                    const parent = this.closest('.page');
                    parent.querySelectorAll('.section').forEach(section => section.style.display = 'none');
                    document.getElementById(sectionId).style.display = 'block';
                    parent.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Logout buttons
            document.getElementById('user-logout')?.addEventListener('click', () => {
                currentUser = null;
                navigateTo('landing');
                showNotification('Logged out!', 'success');
            });
            
            document.getElementById('driver-logout')?.addEventListener('click', () => {
                currentUser = null;
                navigateTo('landing');
                showNotification('Logged out!', 'success');
            });
            
            document.getElementById('admin-logout')?.addEventListener('click', () => {
                currentUser = null;
                navigateTo('landing');
                showNotification('Logged out!', 'success');
            });
            
            // Theme toggle
            document.querySelectorAll('.theme-toggle').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.body.classList.toggle('dark-mode');
                    showNotification('Theme changed!', 'success');
                });
            });
            
            // Chatbot
            document.getElementById('chatbot-toggle').addEventListener('click', () => {
                document.getElementById('chatbot').classList.toggle('active');
            });
            
            document.getElementById('close-chatbot').addEventListener('click', () => {
                document.getElementById('chatbot').classList.remove('active');
            });
            
            document.getElementById('send-chat-btn').addEventListener('click', () => {
                const input = document.getElementById('chat-input');
                const message = input.value.trim();
                if (!message) return;

                const chatMessages = document.getElementById('chat-messages');
                const userMsg = document.createElement('div');
                userMsg.className = 'chat-message user';
                userMsg.textContent = message;
                chatMessages.appendChild(userMsg);
                input.value = '';

                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.textContent = getBotResponse(message);
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            
            // Update profile
            document.getElementById('update-profile-btn')?.addEventListener('click', () => {
                if (currentUser) {
                    currentUser.name = document.getElementById('profile-name').value;
                    currentUser.email = document.getElementById('profile-email').value;
                    currentUser.phone = document.getElementById('profile-phone').value;
                    showNotification('Profile updated!', 'success');
                }
            });
            
            // Submit help
            document.getElementById('submit-help-btn')?.addEventListener('click', () => {
                showNotification('Help request submitted!', 'success');
            });
            
            // Driver photo upload
            document.getElementById('driver-photo-input')?.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const preview = document.getElementById('driver-photo-preview');
                        preview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                        showNotification('✅ Profile photo uploaded!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Vehicle photo upload
            document.getElementById('vehicle-photo-input')?.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const preview = document.getElementById('vehicle-photo-preview');
                        preview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
                        showNotification('✅ Vehicle photo uploaded!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Update driver profile
            document.getElementById('update-driver-profile-btn')?.addEventListener('click', () => {
                if (currentUser && currentRole === 'driver') {
                    currentUser.name = document.getElementById('driver-profile-name').value;
                    currentUser.phone = document.getElementById('driver-profile-phone').value;
                    currentUser.address = document.getElementById('driver-profile-address').value;
                    currentUser.aadhar = document.getElementById('driver-profile-aadhar').value;
                    currentUser.pan = document.getElementById('driver-profile-pan').value;
                    currentUser.license = document.getElementById('driver-profile-license').value;
                    currentUser.vehicleType = document.getElementById('driver-profile-vehicle').value;
                    showNotification('✅ Driver profile updated successfully!', 'success');
                }
            });
            
            console.log('✅ TEST ACCOUNTS:');
            console.log('Admin: admin@ridehub.com / admin123');
            console.log('Driver: rajesh@ridehub.com / driver123');
            console.log('Sign up as User or Driver to get started!');
            console.log('✅ All initialization complete!');
        });

        function getBotResponse(message) {
            const lower = message.toLowerCase();

            if (/(hi|hello|hey)\b/.test(lower)) {
                return 'Hi there! Need help booking a ride or checking fares?';
            }

            if (lower.includes('book')) {
                document.getElementById('booking-modal').classList.add('active');
                return 'Sure! Select a vehicle and fill pickup/drop details in the booking modal.';
            }

            if (lower.includes('fare') || lower.includes('price')) {
                return 'Current fares: Auto ₹12/km, Car ₹18/km, Bike ₹8/km, Lorry ₹35/km, Tipper ₹45/km, JCB ₹60/km (+5% platform fee).';
            }

            if (lower.includes('help') || lower.includes('support')) {
                return 'Our support team is here 24/7. Let me know what you need and I can guide you.';
            }

            if (lower.includes('bye')) {
                return 'Safe travels! Reach out anytime you need another ride.';
            }

            return 'I can help with bookings, fares, and RideHub support. What would you like to do?';
        }
    


       /* ============================================================
   UPDATED GOOGLE MAPS + FALLBACK SYSTEM
   Works even if Google Maps fails / gets blocked / API expires
   ============================================================ */

let map = null,
marker = null,
geocoder = null,
autocompletePickup = null,
autocompleteDrop = null;

let mapsAvailable = false;

/* SAFE INIT — will NOT crash even if Google Maps is unavailable */
function safeInitMap() {
const mapContainer = document.getElementById('map');

// If Google Maps is blocked / not loaded → fallback mode
if (typeof google === "undefined" || !google.maps) {
    console.warn("⚠️ Google Maps unavailable — switching to manual mode.");
    mapsAvailable = false;

    if (mapContainer) {
        mapContainer.style.display = "none";

        // Show helpful fallback message
        const hint = document.createElement("div");
        hint.style.padding = "1rem";
        hint.style.marginTop = "0.5rem";
        hint.style.background = "rgba(0,0,0,0.05)";
        hint.style.borderRadius = "8px";
        hint.textContent =
            "Map is not available. Please enter pickup & drop manually.";
        mapContainer.parentNode.insertBefore(hint, mapContainer.nextSibling);
    }
    return;
}

// If Google Maps loads successfully
mapsAvailable = true;

const defaultLoc = { lat: 20.5937, lng: 78.9629 };

map = new google.maps.Map(mapContainer, {
    center: defaultLoc,
    zoom: 5,
    disableDefaultUI: false,
});

marker = new google.maps.Marker({
    map,
    position: defaultLoc,
    visible: false,
});

geocoder = new google.maps.Geocoder();

const pickupInput = document.getElementById("pickup-location");
const dropInput = document.getElementById("drop-location");

/* Autocomplete Setup */
try {
    autocompletePickup = new google.maps.places.Autocomplete(pickupInput);
    autocompleteDrop = new google.maps.places.Autocomplete(dropInput);

    autocompletePickup.addListener("place_changed", () => {
        const place = autocompletePickup.getPlace();
        if (place.geometry) setMapToPlace(place.geometry.location);
    });

    autocompleteDrop.addListener("place_changed", () => {
        const place = autocompleteDrop.getPlace();
        if (place.geometry) setMapToPlace(place.geometry.location);
    });
} catch (err) {
    console.warn("Autocomplete error:", err);
}
}

/* UPDATE MAP POSITION SAFELY */
function setMapToPlace(latlng) {
if (!mapsAvailable || !map || !marker) return;

map.setCenter(latlng);
map.setZoom(14);
marker.setPosition(latlng);
marker.setVisible(true);
}

/* REVERSE GEOCODE (safe mode) */
function reverseGeocode(lat, lng) {
if (!mapsAvailable || !geocoder) {
    // Fallback: just insert coordinates
    document.getElementById("pickup-location").value =
        `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    return;
}

geocoder.geocode({ location: { lat, lng } }, (results, status) => {
    if (status === "OK" && results[0]) {
        document.getElementById("pickup-location").value =
            results[0].formatted_address;
    } else {
        document.getElementById("pickup-location").value =
            `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
});
}

/* CALL SAFE INIT ON PAGE LOAD */
document.addEventListener("DOMContentLoaded", () => {
safeInitMap();
});
