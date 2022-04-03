import React from 'react'
import {Form, Card} from 'react-bootstrap'

import {Link} from 'react-router-dom'
 
function Home() {
  return (
    <Card>
    <Form>
    <div><h1>Home</h1></div>
    <Form.Group>
    <small> Logout <Link to='/login'>Logout</Link> </small>
    </Form.Group>

    </Form>

    </Card>

  )
}

export default Home