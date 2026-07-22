/**
 * JavaScript Logika Multi-fitur UAS Web Desain 2
 * Tema: Premium Earthy Chocolate & Fresh Green Hint
 */

$(document).ready(function() {
    
    // 1. LIVE REAL-TIME DETEKSI STATUS BUKA/TUTUP WARUNG
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

    // 2. KALKULATOR INTERAKTIF SIMULASI KATERING
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
            
            window.open("https://wa.me/6282177845467?text=" + encodeText, '_blank');
            btn.prop('disabled', false).html('Kirim ke WhatsApp <i class="fab fa-whatsapp ml-2"></i>');
        }, 1000);
    });

    /* ============================================================
       6. FITUR KERANJANG BELANJA & SISTEM PEMESANAN (CART SYSTEM)
       ============================================================ */
    var NOMOR_WA_TOKO = "6282177845467"; // Nomor WhatsApp admin untuk menerima pesanan
    var cart = JSON.parse(localStorage.getItem('baksoLarasCart')) || [];

    function simpanCart() {
        localStorage.setItem('baksoLarasCart', JSON.stringify(cart));
    }

    function formatRupiah(angka) {
        return "Rp " + angka.toLocaleString('id-ID');
    }

    // Tambah item ke keranjang (atau tambah qty jika produk sudah ada)
    function tambahKeKeranjang(nama, harga, gambar) {
        var existing = cart.find(function(item) { return item.nama === nama; });
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ nama: nama, harga: harga, gambar: gambar, qty: 1 });
        }
        simpanCart();
        renderCart();
        tampilkanToast(nama + " ditambahkan ke keranjang");
    }

    // Ubah jumlah qty item (tombol +/-)
    function ubahQty(nama, delta) {
        var item = cart.find(function(i) { return i.nama === nama; });
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(function(i) { return i.nama !== nama; });
        }
        simpanCart();
        renderCart();
    }

    // Hapus item dari keranjang
    function hapusItem(nama) {
        cart = cart.filter(function(i) { return i.nama !== nama; });
        simpanCart();
        renderCart();
    }

    // Render ulang tampilan keranjang & badge jumlah item di navbar
    function renderCart() {
        var totalQty = cart.reduce(function(sum, i) { return sum + i.qty; }, 0);
        $('#cartCount').text(totalQty);

        if (cart.length === 0) {
            $('#cartEmptyState').show();
            $('#cartItemsWrapper').hide();
            return;
        }

        $('#cartEmptyState').hide();
        $('#cartItemsWrapper').show();

        var bodyHtml = '';
        var grandTotal = 0;

        cart.forEach(function(item) {
            var subtotal = item.harga * item.qty;
            grandTotal += subtotal;
            bodyHtml += '' +
                '<tr data-nama="' + item.nama + '">' +
                    '<td class="d-flex align-items-center">' +
                        '<img src="' + item.gambar + '" class="cart-item-img" alt="' + item.nama + '">' +
                        '<span class="cart-item-name">' + item.nama + '</span>' +
                    '</td>' +
                    '<td class="text-center text-muted">' + formatRupiah(item.harga) + '</td>' +
                    '<td>' +
                        '<div class="qty-stepper mx-auto">' +
                            '<button type="button" class="btn-qty-minus" data-nama="' + item.nama + '">&minus;</button>' +
                            '<span class="qty-value">' + item.qty + '</span>' +
                            '<button type="button" class="btn-qty-plus" data-nama="' + item.nama + '">&plus;</button>' +
                        '</div>' +
                    '</td>' +
                    '<td class="text-right font-weight-bold text-brown">' + formatRupiah(subtotal) + '</td>' +
                    '<td class="text-center">' +
                        '<button type="button" class="btn-remove-item" data-nama="' + item.nama + '"><i class="fas fa-times-circle"></i></button>' +
                    '</td>' +
                '</tr>';
        });

        $('#cartItemsBody').html(bodyHtml);
        $('#cartGrandTotal').text(formatRupiah(grandTotal));
    }

    // Notifikasi toast kecil saat produk ditambahkan
    function tampilkanToast(pesan) {
        var toast = $('#cartToast');
        if (toast.length === 0) {
            $('body').append('<div class="cart-toast" id="cartToast"><i class="fas fa-check-circle mr-2"></i><span id="cartToastMsg"></span></div>');
            toast = $('#cartToast');
        }
        $('#cartToastMsg').text(pesan);
        toast.addClass('show');
        clearTimeout(window.cartToastTimer);
        window.cartToastTimer = setTimeout(function() {
            toast.removeClass('show');
        }, 1800);
    }

    // Event: klik tombol "Tambah" di kartu menu
    $(document).on('click', '.btn-add-cart', function() {
        var nama = $(this).data('nama');
        var harga = parseInt($(this).data('harga'));
        var gambar = $(this).data('gambar');
        tambahKeKeranjang(nama, harga, gambar);

        var btn = $(this);
        btn.addClass('added').html('<i class="fas fa-check mr-1"></i>Ditambahkan');
        setTimeout(function() {
            btn.removeClass('added').html('<i class="fas fa-cart-plus mr-1"></i>Tambah');
        }, 1200);
    });

    // Event: tombol qty plus / minus di dalam tabel keranjang
    $(document).on('click', '.btn-qty-plus', function() {
        ubahQty($(this).data('nama'), 1);
    });
    $(document).on('click', '.btn-qty-minus', function() {
        ubahQty($(this).data('nama'), -1);
    });

    // Event: hapus item dari keranjang
    $(document).on('click', '.btn-remove-item', function() {
        hapusItem($(this).data('nama'));
    });

    // Event: kosongkan seluruh keranjang
    $('#btnClearCart').on('click', function() {
        if (cart.length === 0) return;
        if (confirm('Kosongkan semua item dari keranjang?')) {
            cart = [];
            simpanCart();
            renderCart();
        }
    });

    // Tampilkan/sembunyikan kolom alamat sesuai metode pemesanan
    $('#checkoutMetode').on('change', function() {
        if ($(this).val() === 'Diantar (Delivery)') {
            $('#checkoutAlamatWrapper').slideDown(150);
            $('#checkoutAlamat').attr('required', true);
        } else {
            $('#checkoutAlamatWrapper').slideUp(150);
            $('#checkoutAlamat').removeAttr('required');
        }
    });

    // Validasi & submit form checkout -> susun pesan terstruktur -> kirim ke WhatsApp
    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        var errorBox = $('#checkoutError');
        errorBox.hide().text('');

        var nama = $('#checkoutNama').val().trim();
        var hp = $('#checkoutHp').val().trim();
        var metode = $('#checkoutMetode').val();
        var alamat = $('#checkoutAlamat').val().trim();

        // Validasi dasar sebelum pesanan dikirim
        if (cart.length === 0) {
            errorBox.text('Keranjang Anda masih kosong. Silakan tambahkan menu terlebih dahulu.').show();
            return;
        }
        if (nama.length < 3) {
            errorBox.text('Mohon isi nama lengkap Anda (minimal 3 karakter).').show();
            return;
        }
        var hpBersih = hp.replace(/[^0-9]/g, '');
        if (hpBersih.length < 9) {
            errorBox.text('Nomor WhatsApp tidak valid. Mohon periksa kembali.').show();
            return;
        }
        if (metode === 'Diantar (Delivery)' && alamat.length < 8) {
            errorBox.text('Mohon isi alamat pengantaran dengan lengkap.').show();
            return;
        }

        var btn = $('#btnCheckout');
        btn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin mr-2"></i>Menyiapkan Pesanan...');

        setTimeout(function() {
            // Susun rincian pesanan
            var rincian = '';
            var grandTotal = 0;
            cart.forEach(function(item, idx) {
                var subtotal = item.harga * item.qty;
                grandTotal += subtotal;
                rincian += (idx + 1) + ". " + item.nama + " x" + item.qty + " = " + formatRupiah(subtotal) + "\n";
            });

            var textWA = "Halo Admin *BAKSO LARAS*, saya ingin memesan:\n\n" +
                rincian +
                "\n*Total Pembayaran: " + formatRupiah(grandTotal) + "*\n\n" +
                "-- Data Pemesan --\n" +
                "Nama: " + nama + "\n" +
                "No. HP: " + hp + "\n" +
                "Metode: " + metode +
                (metode === 'Diantar (Delivery)' ? ("\nAlamat: " + alamat) : "") +
                "\n\nMohon konfirmasi pesanan saya. Terima kasih!";

            var encodeText = encodeURIComponent(textWA);
            window.open("https://wa.me/" + NOMOR_WA_TOKO + "?text=" + encodeText, '_blank');

            // Kosongkan keranjang & form setelah pesanan berhasil dikirim
            cart = [];
            simpanCart();
            renderCart();
            $('#checkoutForm')[0].reset();
            $('#checkoutAlamatWrapper').hide();
            btn.prop('disabled', false).html('Pesan Sekarang via WhatsApp <i class="fab fa-whatsapp ml-2"></i>');
            $('#cartModal').modal('hide');
        }, 900);
    });

    // Render keranjang saat halaman pertama kali dimuat (mengambil data tersimpan di localStorage)
    renderCart();
});
