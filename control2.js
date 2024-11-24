// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "https://your-database-url.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Kết nối đến Realtime Database
const database = firebase.database();

// Hàm điều khiển hệ thống
function controlSystem(action) {
    let statusRef;

    // Xác định băng chuyền nào cần điều khiển
    if (['red1', 'green1', 'blue1', 'error1'].includes(action)) {
        statusRef = database.ref('conveyor1/status');
    } else if (['column2', 'increase2', 'decrease2', 'startStop2'].includes(action)) {
        statusRef = database.ref('conveyor2/status');
    } else {
        console.error("Lệnh không hợp lệ:", action);
        return;
    }

    // Gửi lệnh điều khiển đến Firebase
    statusRef.set(action)
        .then(() => {
            // Cập nhật trạng thái hiển thị trên giao diện người dùng
            const statusElement = action.includes('1') ? document.getElementById('status1') : document.getElementById('status2');
            statusElement.innerText = 'Trạng thái: ' + action;
        })
        .catch((error) => {
            console.error("Lỗi khi gửi lệnh điều khiển:", error);
        });
}

// Lắng nghe thay đổi trạng thái từ Firebase cho băng chuyền 1
database.ref('conveyor1/status').on('value', (snapshot) => {
    const status = snapshot.val();
    document.getElementById('status1').innerText = 'Trạng thái: ' + status;
});

// Lắng nghe thay đổi trạng thái từ Firebase cho băng chuyền 2
database.ref('conveyor2/status').on('value', (snapshot) => {
    const status = snapshot.val();
    document.getElementById('status2').innerText = 'Trạng thái: ' + status;
});