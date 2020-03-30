var rootDiv = document.getElementById('app');

class MyApp extends React.Component {

    state = {
        response: null,
        statusCode:null
    }

    setResponse = (_resp) => {
        this.setState({
            response: _resp,
        });
    }
    setStatus = (_statusCode) => {
        this.setState({
            statusCode : _statusCode
        });
    }
    render() {
        return (
            <div className="container">
                <Form
                    setResponse={this.setResponse} setStatus={this.setStatus}
                />
                <ResultDiv
                    response={this.state.response}  status={this.state.statusCode}
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
                'Content-Type': 'application/json',
                'Origin': 'http://127.0.0.1:8080',
                'x-requested-with' : 'XMLHttpRequest'

            }
        };
        if(method =='POST' && body){
            options['body'] = body;
        }
        const proxyurl = "https://tranquil-dawn-42121.herokuapp.com/";
        fetch( proxyurl +url, options)
        .then(res => {
            this.props.setStatus(res.status);
            return res.json();
        })
        .then(res => {
            console.log(res);
            this.props.setResponse(res);

        })
        .catch(err => {
            this.props.setResponse(err);
            console.log(err);
        });
    }

    render() {
        return (
            <form onSubmit={this.sendRequest} className="urlForm">
                <div className="input-group">
                    <select className="method" name="method">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="POST">PUT</option>
                    <option value="POST">DELETE</option>

                    </select>
                    <input type="url" class="form-control" placeholder="Enter URL" aria-label="Recipient's username" aria-describedby="button-addon2" name="url" required></input>
                    <div className="input-group-append">
                    <button className="btn btn-outline-success" type="submit">Send</button>
                    </div>
                </div>

                <div class="form-group" style={{marginTop: 20 + 'px'}}>
                    <label ><strong>JSON Body</strong></label>
                    <textarea class="form-control" rows="3" name="body"></textarea>
                </div>
            </form>
        );
    }

}

class ResultDiv extends React.Component {

    render() {
        return (
            <div>
            <h3>Response Body</h3>
            <h6> Status Code : {this.props.status} </h6> 
                <pre id="response">
                    { this.props.response && JSON.stringify(this.props.response, undefined, 4) }
                    
                </pre>
            </div>
        )   
    }
}

ReactDOM.render(<MyApp/>, rootDiv);
