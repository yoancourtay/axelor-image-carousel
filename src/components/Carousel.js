import React, { Component } from 'react'

export default class Carousel extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            pictures: []
        }
        this.getPictures = this.getPictures.bind(this)
    }

    getPictures () {
        const params = new URLSearchParams(document.location.search)
        const id = params.get('albumId')

        if (id) {
            
        }
    }

    componentDidMount() { 
        this.getPictures()
    }
  
    render() {
        return (
            <div>Carousel</div>
        )
    }
}
