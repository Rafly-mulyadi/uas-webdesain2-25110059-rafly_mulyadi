/**
 * JavaScript Logika Multi-fitur UAS Web Desain 2
 * Tema: Premium Earthy Chocolate & Fresh Green Hint
 */

$(document).ready(function() {
    
    // 1. FITUR BARU: LIVE REAL-TIME DETEKSI STATUS BUKA/TUTUP WARUNG
    function checkTokoStatus() {
        var now = new Date();
        var hours = now.getHours();
        var badge = $('#live-status-badge');
        
        // Jam Operasional: 04.00 - 23.00 WIB
        if (hours >= 4 && hours < 23) {
            badge.html('<span class="badge badge-success px-4 py-2 font-weight-bold" style="background-color: #2E7D32; box-shadow: 0 0 10px rgba(46,125,50,0.5);"><i class="fas fa-circle text-white mr-2 animate-pulse"></i> WARUNG BUKA SEKARANG</span>');
        } else {
            badge.html('<span class="badge badge-danger px-4 py-2 font-weight-bold" style="box-shadow: 0 0 10px rgba(211,47,47,0.5);"><i class="fas fa-moon mr-2"></i> WARUNG TUTUP (Buka Jam 04:00)</span>');
        }
    }
    checkTokoStatus(); // Jalankan fungsi saat web dibuka

    // 2. FITUR BARU: KALKULATOR INTERAKTIF SIMULASI KATERING
    function hitungKatering() {
        var hargaMenu = parseInt($('#calcMenu').val());
        var jumlahPorsi = parseInt($('#calcJumlah').val());
        
        // Proteksi minimal input 50 porsi
        if (isNaN(jumlahPorsi) || jumlahPorsi < 50) {
            jumlahPorsi = 50;
        }
        
        var total = hargaMenu * jumlahPorsi;
        
        // Format Currency Rupiah otomatis
        var formattedTotal = "Rp " + total.toLocaleString('id-ID');
        $('#calcTotalDisplay').text(formattedTotal);
    }
    
    // Trigger kalkulator setiap ada perubahan input
    $('#calcMenu, #calcJumlah').on('input change', function() {
        hitungKatering();
    });

    // 3. SPA NAVIGATION DENGAN SOFT TRANSISI
    $('[data-page]').on('click', function(e) {
        e.preventDefault();
        var targetPage = $(this).attr('data-page');

        $('.page-section').removeClass('active-page animate-fade');
        
        setTimeout(function() {
            $('#' + targetPage).addClass('active-page').addClass('animate-fade');
        }, 40);

        $('.nav-item').removeClass('active');
        $('#nav-' + targetPage).addClass('active');
        $('.navbar-collapse').collapse('hide');
        
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // 4. TRANSFER DATA PRODUK KE BOOTSTRAP MODAL DINAMIS
    $('#detailMenuModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var namaMenu = button.data('nama');   
        var deskripsiMenu = button.data('desc'); 
        
        var modal = $(this);
        modal.find('#modalMenuTitle').text(namaMenu);
        modal.find('#modalMenuDesc').text(deskripsiMenu);
    });

    // 5. REDIRECT DIRECT-SEND CHAT KE API WHATSAPP
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var keperluan = $('#inputKeperluan').val();
        var nama = $('#inputNama').val();
        var pesan = $('#inputPesan').val();
        
        var btn = $('#btnSubmit');
        btn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin mr-2"></i>Menghubungkan ke WA...');

        setTimeout(function() {
            var textWA = "Halo Admin Bakso Laras, saya *" + nama + "*. Ingin menanyakan perihal *" + keperluan + "*:\n\n_\"" + pesan + "\"_";
            var encodeText = encodeURIComponent(textWA);
            
            // Menggunakan nomor yang valid dari pengaturan Ledger sebelumnya
            window.open("https://wa.me/6282177845467?text=" + encodeText, '_blank');
            btn.prop('disabled', false).html('Kirim ke WhatsApp <i class="fab fa-whatsapp ml-2"></i>');
        }, 1000);
    });
});
