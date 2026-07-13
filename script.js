/**
 * JavaScript Utama untuk Project UAS Web Desain 2
 * Studi Kasus: Company Profile BAKSO LARAS Pekanbaru
 */

$(document).ready(function() {
            
    // 1. FITUR NAVIGASI SPA (Single Page Application) DAN SMOOTH SCROLL
    $('[data-page]').on('click', function(e) {
        e.preventDefault();
        var targetPage = $(this).attr('data-page');

        // Sembunyikan semua halaman, lalu hidupkan halaman target
        $('.page-section').removeClass('active-page');
        $('#' + targetPage).addClass('active-page');

        // Mengatur active state navbar menu item secara dinamis
        $('.nav-item').removeClass('active');
        $('#nav-' + targetPage).addClass('active');

        // Fitur JS Wajib: Navbar Collapse otomatis menutup di resolusi smartphone setelah diklik
        $('.navbar-collapse').collapse('hide');
        
        // Melakukan scroll halus (smooth scroll) otomatis ke atas halaman
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // 2. BOOTSTRAP MODAL DINAMIS (Mengisi data konten modal berdasarkan tombol detail yang diklik)
    $('#detailMenuModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Tombol yang memicu modal
        var namaMenu = button.data('nama');   // Mengambil data-nama atribut
        var deskripsiMenu = button.data('desc'); // Mengambil data-desc atribut
        
        var modal = $(this);
        modal.find('#modalMenuTitle').text(namaMenu);
        modal.find('#modalMenuDesc').text(deskripsiMenu);
    });

    // 3. VALIDASI FORM & INTEGRASI KE WHATSAPP API GATEWAY
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var keperluan = $('#inputKeperluan').val();
        var nama = $('#inputNama').val();
        var pesan = $('#inputPesan').val();
        
        // Fitur JS Tambahan: Mengubah tombol menjadi state loading/memproses
        var btn = $('#btnSubmit');
        btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin mr-2"></i>Memproses...');

        setTimeout(function() {
            // Memformat susunan pesan string agar otomatis rapi saat dikirim ke WhatsApp klien
            var textWA = "Halo Bakso Laras, saya " + nama + " ingin menanyakan perihal *" + keperluan + "*: " + pesan;
            var encodeText = encodeURIComponent(textWA);
            
            // Redirect langsung menuju aplikasi WhatsApp/WhatsApp Web tujuan
            window.open("https://wa.me/6282177845467?text=" + encodeText, '_blank');
            
            // Mengembalikan status tombol utama form
            btn.prop('disabled', false).text('Kirim Pesan via WhatsApp');
        }, 1000);
    });
});