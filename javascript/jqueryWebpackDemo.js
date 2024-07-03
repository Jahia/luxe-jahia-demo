import 'jquery-ui';
import './style.css';

function main() {
    $(function () {
        console.log('jquery version: ' + $.fn.jquery);
        $('button').on('click', function() {
            $('.fold').toggle('fold', 1000);
        });
    });
}

main();