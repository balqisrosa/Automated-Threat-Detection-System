const threatCases = {
    spoofing: [
        "Penyerang menggunakan email palsu untuk meminta transfer dana.",
        "Phishing yang mencuri kredensial login pengguna.",
        "Memalsukan alamat IP untuk menyamar sebagai pengguna lain."
    ],
    tampering: [
        "Modifikasi data transaksi tanpa izin.",
        "Pemalsuan parameter URL untuk mengakses data sensitif.",
        "Manipulasi file konfigurasi aplikasi."
    ],
    repudiation: [
        "Pengguna menyangkal pengiriman formulir online.",
        "Menghapus jejak log untuk menghindari pelacakan.",
        "Mengklaim bahwa tindakan berbahaya tidak dilakukan."
    ],
    informationDisclosure: [
        "Tereksposnya data sensitif melalui URL.",
        "Akses tidak sah ke file laporan keuangan.",
        "Penangkapan data dengan sniffing di jaringan publik."
    ],
    denialOfService: [
        "Serangan DDoS membuat server tidak responsif.",
        "Permintaan besar-besaran memperlambat sistem.",
        "Blokir sumber daya yang memutus akses pengguna."
    ],
    elevationOfPrivilege: [
        "Eksploitasi bug untuk akses admin.",
        "Hak istimewa pengguna dinaikkan tanpa izin.",
        "Manipulasi token untuk hak akses lebih tinggi."
    ]
};

function updateThreatExamples() {
    const selectedCategory = document.getElementById('strideCategory').value;
    const caseContainer = document.getElementById('caseContainer');
    const caseSelect = document.getElementById('caseSelect');
    caseSelect.innerHTML = `<option value="" selected disabled>Pilih Kasus</option>`;  // reset opsi kasus

    if (threatCases[selectedCategory]) {
        threatCases[selectedCategory].forEach((caseText, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Kasus ${index + 1}: ${caseText}`;
            caseSelect.appendChild(option);
        });
        document.getElementById('dreadScoresContainer').style.display = 'block';
    } else {
        caseContainer.innerHTML = 'Pilih kategori STRIDE untuk melihat contoh kasus.';
        document.getElementById('dreadScoresContainer').style.display = 'none';
    }
}

document.getElementById('strideCategory').addEventListener('change', updateThreatExamples);

function analyzeThreat() {
    const logData = document.getElementById('logInput').value;
    const strideCategory = document.getElementById('strideCategory').value;
    const selectedCaseIndex = document.getElementById('caseSelect').value;

    const damageScore = document.getElementById('damageScore').value;
    const reproducibilityScore = document.getElementById('reproducibilityScore').value;
    const exploitabilityScore = document.getElementById('exploitabilityScore').value;
    const affectedUsersScore = document.getElementById('affectedUsersScore').value;
    const discoverabilityScore = document.getElementById('discoverabilityScore').value;

    if (!strideCategory || selectedCaseIndex === null || !damageScore || !reproducibilityScore || !exploitabilityScore || !affectedUsersScore || !discoverabilityScore) {
        alert('Harap isi semua kolom untuk melanjutkan analisis.');
        return;
    }

    const selectedCase = threatCases[strideCategory][selectedCaseIndex];

    const totalDreadScore = parseInt(damageScore) + parseInt(reproducibilityScore) + parseInt(exploitabilityScore) +
        parseInt(affectedUsersScore) + parseInt(discoverabilityScore);

    // Fungsi untuk menentukan warna dan deskripsi berdasarkan total skor
    function getScoreColorAndText(score) {
        let color, scoreText;
        if (score >= 1 && score <= 15) {
            color = 'score-low';   // Skor Rendah
            scoreText = 'Skor Rendah';
        } else if (score >= 16 && score <= 30) {
            color = 'score-medium'; // Skor Sedang
            scoreText = 'Skor Sedang';
        } else if (score >= 31 && score <= 45) { 
            color = 'score-high';   // Skor Tinggi
            scoreText = 'Skor Tinggi';
        } else {
            color = 'score-low'; // Default ke Skor Rendah jika tidak masuk rentang
            scoreText = 'Skor Rendah';
        }
        return { color, scoreText };
    }    
    
    const { color, scoreText } = getScoreColorAndText(totalDreadScore);

    const specificAction = {
        spoofing: "Periksa autentikasi yang kuat untuk mencegah penyamaran.",
        tampering: "Implementasikan tanda tangan digital untuk memastikan integritas data.",
        repudiation: "Gunakan log audit yang tidak dapat dimodifikasi.",
        informationDisclosure: "Enkripsi data sensitif dalam transmisi.",
        denialOfService: "Gunakan pemantauan untuk mendeteksi dan membatasi serangan DDoS.",
        elevationOfPrivilege: "Periksa hak akses pengguna dan tambahkan kontrol keamanan yang ketat."
    };

    document.getElementById('resultText').innerHTML = `
<span class="bold">Log:</span> ${logData}<br>
<span class="bold">Kasus:</span> ${selectedCase}<br>
<span class="bold">STRIDE Kategori:</span> ${strideCategory}<br>
<span class="bold ${color}">Total Skor DREAD: ${totalDreadScore} (${scoreText})</span><br>
<span class="bold">Tindakan yang Disarankan:</span> ${specificAction[strideCategory]}`;

    document.getElementById('outputContainer').style.display = 'block';
}
