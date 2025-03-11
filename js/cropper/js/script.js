$(document).ready(function () {

    // Cropperインスタンスを保持する変数（画像更新時の破棄に使用）
    var cropper;//初回は動かず、二回目から関数内の1戻り値によってインスタンス（処理）が入る

    $('#inputImage').on('change', function (event) {
        
        var file = event.target.files[0];
        
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#target').attr('src', e.target.result).show();

                // すでにcropper変数に前回のインスタンス（再選択前）が保持されていたら
                if (cropper) {
                    cropper.destroy(); //インスタンス破棄
                }

                // 新しい Cropper インスタンスを作成
                cropper = afterTrim();

            };
            reader.readAsDataURL(file);
        }
    });

    function afterTrim() { //プラグインと競争するのでバニラjsで記述
        let target = document.getElementById('target');
        let cropper = new Cropper(target, {
            //オプションを追加
            aspectRatio: 1, //正方形トリミング
            preview: '#preview', //リアルタイムプレビュー
            crop(event) { //cropイベントを使用してリアルタイムでプレビューを更新（トリミングボタンが不要になる）
                let canvas = cropper.getCroppedCanvas();
                let data = canvas.toDataURL();
                $('#preview').attr({ //preview要素をatterで取得
                    'val': data, //オブジェクトにしてinputに複数設定
                    'src': data
                });
                // プレビュー画像のデータを hidden フィールドに設定
                $('#previewData').val(data);
            },
            wheelZoomRatio: 0.1,
            zoomOnWheel: true,
            minCanvasWidth: 300, //黒背景含めたCanvasの最小幅
            minCanvasHeight: 300,
            minCropBoxWidth: 100, //クロップグボックスの最小幅
            minCropBoxHeight: 100,
        });
        
        cropperRotate
        //関数のインスタンスの実行処理をを呼び出し元（var cropper）に返す
        return cropper; //これがないと2回目の判定ができず、画像の選びなおしができない
    }
    
            // 各種機能ボタン発火
        document.getElementById('cropperReset').addEventListener('click', function () {
            cropper.reset();
        });
        document.getElementById('cropperRotate').addEventListener('click', function () {
            cropper.rotate(90);
        });
    
        // フォーム送信時にデータを localStorage に保存
    $('#imageForm').on('submit', function(event) {
        event.preventDefault(); // フォームのデフォルト送信を防止
        var previewData = $('#previewData').val();
        localStorage.setItem('previewData', previewData);
        window.location.href = 'index2.html'; // 次のページに遷移
    });
    
});