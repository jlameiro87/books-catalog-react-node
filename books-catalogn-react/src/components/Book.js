import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

function Book(props) {
    return (
        <Card centered>
            <Card.Content>
                <Card.Header>{props.book.title}</Card.Header>
                <Card.Description>
                    <div><Icon name='user circle' />{props.book.author}</div>
                    <div><Icon name='key' />{props.book.isbn}</div>
                    <div><Icon name='time' />{props.book.year}</div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default Book;