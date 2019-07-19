$(function () {
      var socket = io();
      var timer;
      var data;
      var errorFound = false;
      var valueKapasitas=0;
      var valueKebocoran=0;
      clearInterval(timer);
       var msgPelanggan = {
        'idPelanggan' : '{{idPelanggan}}',
        'idAlat'  : '{{idAlat}}'
      }
        timer = setInterval(function(){
          console.log(socket.id);
            socket.emit("id",msgPelanggan);

      },10000);

      socket.on('{{idAlat}}', function(err,pesanErr,kapasitas,kebocoran){
        if (err) {
          console.log(pesanErr);
          $('.chartKapasitas').hide();
          $('.chartKebocoran').hide();
          $("#textError").text(pesanErr);
          $("#textError").show();
        }else {
          console.log(pesanErr);
          console.log("kapasitas "+kapasitas);
          console.log("Kebocoran "+kebocoran);
          $("#textError").hide();
          if (kapasitas < 5000) {
            $('.chartKapasitas').hide();
            $('.chartKebocoran').hide();
            $("#textError").text("Tabung Tidak Terdeteksi");
            $("#textError").show();
          }else {
            console.log("clear");
            $('.chartKapasitas').show();
            $('.chartKebocoran').show();
            window.valueKapasitas = (kapasitas-5000)/3000 * 100;
            window.valueKebocoran = (kebocoran-200)/400 * 100;
            console.log($('.chartKapasitas').attr('data-percent'));
            $('.chartKapasitas').attr('data-percent',valueKapasitas);
            $('.chartKebocoran').attr('data-percent',valueKebocoran);

            chartKapasitas.update(window.valueKapasitas);
            chartKebocoran.update(window.valueKebocoran);
            }
          }
        });
      });
