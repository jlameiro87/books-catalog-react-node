import React, { Component } from 'react';
import { Header, Icon, Button, Grid, Label } from 'semantic-ui-react';
import Book from './Book';

const API_URL = 'http://localhost:3003/api/books';

const divNavigationStyles = {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center'
};

const divDashboardStyles = {
    'display': 'flex',
    'flexDirection': 'column'
};

class Dashboard extends Component {
    state = {
        books: null,
        booksTotal: null,
        page: 0,
        limit: 10,
        total: 0
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = async () => {
        // const response = await fetch(`${API_URL}?page=${this.state.page}&limit=${this.state.limit}`);
        const response = await fetch(`${API_URL}`);
        const data = await response.json();

        const { page, limit } = this.state;

        this.setState({ total: data.length });
        this.setState({ books: data.slice(page, limit) });
        this.setState({ booksTotal: data });
    }

    getNextBooks = () => {
        const { limit, booksTotal, total } = this.state;

        let newLimit = limit + 10 < total ? limit + 10 : total;

        this.setState({ page: limit, limit: newLimit });
        this.setState({ books: booksTotal.slice(limit, newLimit) });
    }

    getPreviousBooks = () => {
        const { limit, booksTotal } = this.state;

        let newPage = limit - 20 > 0 ? limit - 20 : 0;
        let newLimit = limit - 10 > 0 ? limit - 10 : 10;

        this.setState({ page: newPage, limit: newLimit });
        this.setState({ books: booksTotal.slice(newPage, newLimit) });
    }

    getStartBooks = () => {
        const { booksTotal } = this.state;

        let newPage = 0;
        let newLimit = 10;

        this.setState({ page: newPage, limit: newLimit });
        this.setState({ books: booksTotal.slice(newPage, newLimit) });
    }

    getEndBooks = () => {
        const { booksTotal } = this.state;

        let newLimit = booksTotal.length;
        let newPage = newLimit - 10;

        this.setState({ page: newPage, limit: newLimit });
        this.setState({ books: booksTotal.slice(newPage, newLimit) });
    }

    render() {
        return (
            <div style={divDashboardStyles}>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='book' circular />
                    <Header.Content>Books Catalog</Header.Content>

                    <div>
                        <Label>From: {this.state.page}</Label>
                        <Label>To: {this.state.limit}</Label>
                        <Label color='green'>Total: {this.state.total}</Label>
                    </div>
                </Header>
                <Grid.Row style={divNavigationStyles}>
                    <Button onClick={this.getStartBooks} animated>
                        <Button.Content visible>
                            <Icon name='angle double left' />
                        </Button.Content>
                        <Button.Content hidden>Start</Button.Content>
                    </Button>
                    <Button onClick={this.getPreviousBooks} animated>
                        <Button.Content visible>
                            <Icon name='angle left' />
                        </Button.Content>
                        <Button.Content hidden>Previous</Button.Content>
                    </Button>
                    <Button onClick={this.getNextBooks} animated>
                        <Button.Content visible>
                            <Icon name='angle right' />
                        </Button.Content>
                        <Button.Content hidden>Next</Button.Content>
                    </Button>
                    <Button onClick={this.getEndBooks} animated>
                        <Button.Content visible>
                            <Icon name='angle double right' />
                        </Button.Content>
                        <Button.Content hidden>End</Button.Content>
                    </Button>
                </Grid.Row>
                {
                    this.state.books && this.state.books.map((book) => (
                        <Book key={book.isbn} book={book}></Book>
                    ))
                }
            </div>
        )
    }
}

export default Dashboard;