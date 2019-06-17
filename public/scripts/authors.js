
// console.log(document.getElementById('titleAuthorForm'))
console.log('running')

class FormData{

    
    formSubmit = () => {
        $('#titleAuthorForm').on('submit', (e) => {
            e.preventDefault();
            var formData = $('#titleAuthorForm').serialize();

            $.ajax({
                dataType: 'json',
                method:'GET',
                // data: {formData: formData},
                url: "https://www.goodreads.com/search.xml?key=uVqg3ZC0UsJJEJxchI4Udg&q=Ender%27s+Game",
                success: (res) => {
                    console.log(res.body)
                },
                error: (err) => {
                    console.log(err)
                }
            })

            
        })  
    }
}


getData = () => {
    const form = new FormData()
    form.formSubmit();
}

getData()



// submit()
// .onsubmit = () => {
//     const author = document.getElementById('author').value()
//     const title = document.getElementById('title').value()
//     console.log(title, author)
// }
