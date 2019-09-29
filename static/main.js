function submit_message(message) {
    $.post("/send_message", {message: message}, handle_response);

    function handle_response(data) {
        $('.chat-container').append(`
            <div class="flex">
            <div class="dot">
                <img src="static/lincoln-financial-logo.jpg">
            </div>
            <div class="chat-message col-md-5 offset-md-7 bot-message">
                ${data.message}
            </div>
            </div>
        `)
        $("#loading").remove();
    }
}

$('#target').on('submit', function(e) {
    e.preventDefault();
    const input_message = $('#input_message').val()

    if (!input_message) {
        return
    }

    $('.chat-container').append(`
        <div class="flex">
        <div class="human-message col-md-5 chat-message">
            ${input_message}
        </div>
        <div class="dot2">
        </div>
        </div>
        `)
    
        $('.chat-container').append(`
            <div class="chat-message text-center col-md-2 offset-md-10 bot-message" id="loading">
                <b>...</b>
            </div
        `)

        $('#input_message').val('')

        submit_message(input_message)

        var scrolled = false;
        function updateScroll() {
            if (!scrolled) {
                var element = document.getElementById("chatbox");
                element.scrollTop = element.scrollHeight;
            }
        }

        $("#chatbox").on('scroll', () => {
            scrolled = true;
        });

        setInterval(updateScroll, 50);
});