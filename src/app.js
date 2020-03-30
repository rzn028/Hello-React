var rootDiv = document.getElementById('app');

class MyApp extends React.Component {

    state = {
        response: null
    }

    setResponse = (_resp) => {
        this.setState({
            response: _resp
        });
    }

    render() {
        return (
            <div>
                <Form
                    setResponse= {this.setResponse}
                />
                <ResultDiv
                    response={this.state.response}  
                />
            </div>
        );
    }
}


class Form extends React.Component {

    sendRequest = (e) => {

        e.preventDefault();

        let url = e.target.elements.url.value;
        let method = e.target.elements.method.value;
        let body = e.target.elements.body.value;


        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if(method =='POST' && body)
            options['body'] = body;

        fetch(url, options)
        .then(res => res.json())
        .then(res => {
            this.props.setResponse(res);
        });
    }

    render() {
        return (
            <form onSubmit={this.sendRequest}>
                <select name="method" required>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
                <input type = "text" name="url" required defaultValue="https://jsonplaceholder.typicode.com/todos/1" />
                <textarea name="body" rows="4" cols="40">

                </textarea>
                <button>Submit</button>
            </form>
        );
    }

}

class ResultDiv extends React.Component {

    render() {
        return (
            <div>
                something here
                { JSON.stringify(this.props.response) }
            </div>
        )   
    }
}

ReactDOM.render(<MyApp/>, rootDiv);