import React from 'react';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            dictionary: null,
        }
        this.fetchDictionary = this.fetchDictionary.bind(this)
    }

    fetchDictionary(e) {
        e.preventDefault()
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.query.value}`)
            .then(response => response.json())
            .then(data => this.setState({ dictionary: data }))
        e.target.reset()
    }

    render() {
        const dictionary = this.state.dictionary
        try {
            return (
                <div>
                    <form onSubmit={this.fetchDictionary} id="dictionary-search">
                        <input className="query" type="text" name="query" placeholder="Enter word..." />
                        <input className="submit" type="submit" placeholder="Submit!" />
                    </form>
                    {dictionary &&
                        <div className="results">
                            <div className="word-info">
                                <h1 className="word">{dictionary[0]["word"]}</h1>
                                <h4 className="pronunciation">[ {dictionary[0]["phonetics"][0]["text"]} ]</h4>
                            </div>
                            <div className="meanings">
                                {dictionary[0]["meanings"].map((meaning) => {
                                    return (
                                        <div className="meaning">
                                            <h2 className="part-of-speech">{meaning["partOfSpeech"]}</h2>
                                            <ol className="definitions">
                                                {meaning["definitions"].map((definition) => {
                                                    return (
                                                        <div className="definition">
                                                            {
                                                                definition["definition"] &&
                                                                <li>
                                                                    <p className="definition">{definition["definition"]}</p>
                                                                </li>
                                                            }
                                                            {
                                                                definition["example"] &&
                                                                <i className="example">Ex: {definition["example"]}</i>
                                                            }
                                                            {
                                                                definition["synonyms"] &&
                                                                <div><p>Synonyms:</p>
                                                                    <ul className="synonyms">
                                                                        {definition["synonyms"].map((synonym) => {
                                                                            return (
                                                                                <li className="synonym">{synonym}</li>
                                                                            )
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </ol>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
            )
        } catch {
            return (
                <div>
                    <div className="error-div">
                        <p className="word-error">Invalid word</p>
                    </div>
                    <form onSubmit={this.fetchDictionary} id="dictionary-search">
                        <input className="query" type="text" name="query" placeholder="Enter word..." />
                        <input className="submit" type="submit" placeholder="Submit!" />
                    </form>
                </div>
            )
        }
    }
}

export default App;