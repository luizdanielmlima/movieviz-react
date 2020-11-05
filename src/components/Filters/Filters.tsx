import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    IonButton,
    IonSelectOption,
    IonSelect,
    IonLabel,
    IonItem,
    IonDatetime,
  } from '@ionic/react';

import * as actions from '../../store/actions';
import genres from '../../shared/genres';
import './Filters.css';

interface FilterProps {
    searchParams?: any;
    onSearchParamChanged?: any;
    filterHandler?: any;
}

class Filters extends Component<FilterProps, any> {
    constructor(props: FilterProps) {
        super(props);
        this.state = {};
    }
    
    handleChange(event: any, from: string) {
        const updatedValue = event.detail.value;
        switch (from) {
            case 'genre':
                this.props.onSearchParamChanged('genre', updatedValue);
                break;
            case 'sortBy':
                this.props.onSearchParamChanged('sortBy', updatedValue);
                break;
            case 'year':
                this.props.onSearchParamChanged('year', updatedValue);
                break;
            default:
            // do nothing
        }
    }

    render() {
        const genreOptions = genres.map((genre) => {
            return (
              <IonSelectOption key={genre.id} value={genre.id}>
                {genre.name}
              </IonSelectOption>
            );
        });

        return (
            <form className="form">
                <IonItem className="form-item">
                    <IonLabel position="floating">
                        Genre
                    </IonLabel>
                    <IonSelect
                            name="genre"
                            value={this.props.searchParams.genre}
                            onIonChange={(evt) =>
                                this.handleChange(evt, 'genre')
                            }
                        >
                        {genreOptions}
                    </IonSelect>
                </IonItem>
                <IonItem className="form-item">
                    <IonLabel position="floating">
                        Order By:
                    </IonLabel>
                    <IonSelect
                        name="sortBy"
                        value={this.props.searchParams.sortBy}
                        onIonChange={(evt) =>
                            this.handleChange(evt, 'sortBy')
                        }
                    >
                        <IonSelectOption value="popularity.desc">
                            Popularity
                        </IonSelectOption>
                        <IonSelectOption value="revenue.desc">
                            Revenue
                        </IonSelectOption>
                        <IonSelectOption value="vote_average.desc">
                            Rating
                        </IonSelectOption>
                        <IonSelectOption value="vote_count.desc">
                            Number of Votes
                        </IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem className="form-item">
                    <IonLabel position="floating">
                        Year
                    </IonLabel>
                    <IonDatetime
                        value={this.props.searchParams.year}
                        onIonChange={(evt) =>
                            this.handleChange(evt, 'year')
                        }
                        display-format="YYYY"
                        picker-format="YYYY"
                        display-timezone="utc"
                        name="date-picker"
                        min="1900"
                    ></IonDatetime>
                </IonItem>
                <IonButton
                    className="form-item"
                    color="primary"
                    expand="block"
                    onClick={this.props.filterHandler}
                >
                    FILTER
                </IonButton>
            </form>         
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
      searchParams: state.searchParams,
    };
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      onSearchParamChanged: (paramKey: string, paramValue: string) =>
        dispatch(actions.updateSearchParam(paramKey, paramValue)),
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Filters);