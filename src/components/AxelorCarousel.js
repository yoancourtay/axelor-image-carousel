import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

export default class AxelorCarousel extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            pictures: [],
            axelorAppName: 'pizza-planet',
            paramName: 'albumId',
            
            mainDomain: 'com.axelor.photoalbum.db.Album',
            subDomain: 'com.axelor.photoalbum.db.Photo',
            subDomFieldName : 'photoList',
            
            
            domToSubDomField: [
                {
                    domain: 'com.axelor.photoalbum.db.Album',
                    field: 'photoList'
                },
                {
                    domain: 'com.axelor.photoalbum.db.Photo',
                    field: null
                }
            ]
        }
        
        this.getPictures = this.getPictures.bind(this)
    }

    getPictures () {
        const params = new URLSearchParams(document.location.search)
        const id = params.get(this.state.paramName)
        console.log(this.state.domToSubDomField.length)
        
        let cId = params.get(this.state.paramName)
        this.state.domToSubDomField.forEach(group => {
            
        });

        if (id) {
            fetch(`/${this.state.axelorAppName}/ws/rest/${this.state.mainDomain}/${id}/`, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                json.data[0][this.state.subDomFieldName].forEach(subDomain => {                                       
                    fetch(`/${this.state.axelorAppName}/ws/rest/${this.state.subDomain}/${subDomain.id}/`, {method: 'GET'})
                    .then(response => response.json())
                    .then(json => this.setState(prevState => {
                        return {
                            pictures: [
                            ...prevState.pictures, 
                            `/${this.state.axelorAppName}/ws/rest/com.axelor.meta.db.MetaFile/${json.data[0].picture.id}/content/download`
                        ]
                        }
                    }))
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
        const pictureList = this.state.pictures.map(picture => {
            return(
                picture && <div><img src={picture}/></div>
            )
        })

        return (
            <Carousel
                autoPlay={true}
                dynamicHeight={false}
                infiniteLoop={true}
                width="50%">
                    {pictureList}
            </Carousel>
        )
    }
}
