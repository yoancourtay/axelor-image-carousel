import React, { Component } from 'react'

export default class Carousel extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            pictures: [],
            axelorAppURL: 'http://localhost:8080/pizza-planet',
            mainDomain: 'com.axelor.photoalbum.db.Album',
            subDomain: 'com.axelor.photoalbum.db.Photo',
            subDomFieldName : 'photoList',
            paramName: 'albumId'
        }
        
        this.getPictures = this.getPictures.bind(this)
    }

    getPictures () {
        const params = new URLSearchParams(document.location.search)
        const id = params.get(this.state.paramName)
        console.log('Given ID: ' + id);

        if (id) {
            fetch(`${this.state.axelorAppURL}/ws/rest/${this.state.mainDomain}/${id}/`, {method: 'GET'})
            .then((response) => response.json())
            .then((json) => {
                // console.log(json.data[0][this.state.subDomFieldName])
                json.data[0][this.state.subDomFieldName].forEach(subDomain => {
                    fetch(`${this.state.axelorAppURL}/ws/rest/${this.state.subDomain}/${subDomain.id}/`, {method: 'GET'})
                    .then((response) => response.json())
                    .then((json) => {
                        fetch(`${this.state.axelorAppURL}/ws/rest/com.axelor.meta.db.MetaFile/${json.data[0].picture.id}/`, {method: 'GET'})
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json.data[0])
                        })
                        .catch(err => console.error(err))
                    })
                    .catch(err => console.error(err))
                });
            })
            .catch(err => console.error(err))
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
