/**
 * JavaScript Utama Premium
 * Studi Kasus: Company Profile BAKSO LARAS Pekanbaru
 */

$(document).ready(function() {
            
    // 1. SPA NAVIGATION DENGAN TRANSISI TRANSISI HALUS
    $('[data-page]').on('click', function(e) {
        e.preventDefault();
        var targetPage = $(this).attr('data-page');

        // Lakukan soft-fade effect saat pindah halaman
        $('.page-section').removeClass('active-page');
        $('#' + targetPage).addClass('active-page').addClass('animate-fade');

        // Menandai tab menu navbar yang aktif
        $('.nav-item').removeClass('active');
        $('#nav-' + targetPage).addClass('active');

        // Tutup otomatis menu burger di handphone setelah mengeklik tautan
        $('.navbar-collapse').collapse('hide');
        
        // Scroll halus langsung ke titik awal atas halaman
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // 2. MODAL DENGAN TRANSFER DATA DINAMIS & EFEK TRANSISI
    $('#detailMenuModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var namaMenu = button.data('nama');   
        var deskripsiMenu = button.data('desc'); 
        
        var modal = $(this);
        modal.find('#modalMenuTitle').text(namaMenu);
        modal.find('#modalMenuDesc').text(deskripsiMenu);
    });

    // 3. VALIDASI INPUT FORM & DIRECT TEXT SEND KE WHATSAPP API
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var keperluan = $('#inputKeperluan').val();
        var nama = $('#inputNama').val();
        var pesan = $('#inputPesan').val();
        
        // Atur tombol kirim dalam mode memproses
        var btn = $('#btnSubmit');
        btn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin mr-2"></i>Sedang Membuka WhatsApp...');

        setTimeout(function() {
            // Struktur template pengiriman pesan WhatsApp instan
            var textWA = "Halo Admin Bakso Laras, nama saya *" + nama + "*. Saya ingin mengajukan pertanyaan seputar *" + keperluan + "*:\n\n_\"" + pesan + "\"_";
            var encodeText = encodeURIComponent(textWA);
            
            // Mengarahkan ke WhatsApp menggunakan nomor yang diperbarui di Ledger
            window.open("https://wa.me/6282177845467?text=" + encodeText, '_blank');
            
            // Kembalikan status tombol seperti semula
            btn.prop('disabled', false).html('Kirim Pesan via WhatsApp <i class="fab fa-whatsapp ml-2"></i>');
        }, 1200);
    });
});
