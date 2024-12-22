function analyzeThreat() {
    const logData = document.getElementById('logInput').value;
    const strideCategory = document.getElementById('strideCategory').value;
    const dreadScore = document.getElementById('dreadScore').value;

    if (!logData || !dreadScore) {
        alert('Harap isi semua kolom untuk melanjutkan analisis.');
        return;
    }

    const outputContainer = document.getElementById('outputContainer');
    const resultText = document.getElementById('resultText');

    // Tentukan warna dan pesan berdasarkan skor DREAD
    let riskColor, riskLevelMessage, specificAction;

    // Tentukan tindakan spesifik berdasarkan kategori STRIDE
    switch (strideCategory) {
        case 'spoofing':
            specificAction = "Periksa autentikasi dan otorisasi untuk memastikan tidak ada identitas palsu yang digunakan. Pastikan sistem menggunakan mekanisme autentikasi yang kuat.";
            break;
        case 'tampering':
            specificAction = "Periksa log untuk setiap perubahan yang tidak sah dalam data dan lakukan audit keamanan. Terapkan kontrol integritas data yang lebih ketat.";
            break;
        case 'repudiation':
            specificAction = "Pastikan sistem memiliki catatan log yang tidak dapat dimanipulasi. Terapkan audit trail untuk setiap transaksi.";
            break;
        case 'informationDisclosure':
            specificAction = "Periksa apakah ada data sensitif yang terbuka. Enkripsi data di repositori dan selama transmisi untuk melindungi kerahasiaan.";
            break;
        case 'denialOfService':
            specificAction = "Periksa apakah server Anda dibanjiri permintaan yang berlebihan. Implementasikan batasan dan perlindungan dari serangan DDoS.";
            break;
        case 'elevationOfPrivilege':
            specificAction = "Periksa hak akses pengguna dan pastikan tidak ada pengguna yang mendapatkan hak lebih dari yang seharusnya. Terapkan prinsip least privilege.";
            break;
        default:
            specificAction = "Kategori STRIDE tidak terdeteksi. Pastikan kategori yang dipilih benar.";
            break;
    }

    // Tentukan warna dan level risiko berdasarkan nilai DREAD
    if (dreadScore >= 1 && dreadScore <= 3) {
        riskColor = "green"; // Risiko rendah
        riskLevelMessage = "Risiko Rendah - Tidak Ada Tindakan Segera yang Dibutuhkan.";
    } else if (dreadScore >= 4 && dreadScore <= 7) {
        riskColor = "yellow"; // Risiko sedang
        riskLevelMessage = "Risiko Sedang - Pemantauan dan Penilaian Lanjutan Diperlukan.";
    } else if (dreadScore >= 8 && dreadScore <= 10) {
        riskColor = "red"; // Risiko tinggi
        riskLevelMessage = "Risiko Tinggi - Tindakan Segera Diperlukan.";
    } else {
        alert('Harap masukkan skor DREAD yang valid antara 1 hingga 10.');
        return;
    }

    // Update output dengan warna yang sesuai dan rekomendasi tindakan
    resultText.innerHTML = `Log Data: <strong>${logData}</strong><br>
                            STRIDE Category: <strong>${strideCategory}</strong><br>
                            DREAD Score: <strong>${dreadScore}</strong><br>
                            <strong>Tindakan yang Disarankan:</strong> <span style="color: ${riskColor}; font-weight: bold;">${riskLevelMessage}</span><br>
                            <strong>Tindakan Spesifik: </strong> ${specificAction}`;

    outputContainer.style.display = 'block';
}
