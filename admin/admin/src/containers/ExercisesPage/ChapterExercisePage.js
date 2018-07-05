import React, { Component } from "react"
import Dropdown from "../../components/Dropdown"
import Helmet from "react-helmet"
import ExerciseContent from "./ExerciseContent"
import apis from "../../utils/api"

import styles from "./styles.scss"

class ChapterExercisePage extends Component {
  constructor() {
    super()

    this.state = {
      subjects: [],
      subject: null,
      grades: null,
      grade: null,
      parts: null,
      part: null,
      chapters: null,
      chapter: null
    }
  }

  componentDidMount() {
    this.fetchSubjects()
  }

  fetchChapters = id => {
    const part = id || this.state.part

    fetch(`${apis.LIST_CHAPTERS}?part=${part}`).then(async res => {
      const data = await res.json()
      const parsedData = data.map(item => ({
        value: item.id,
        label: item.name
      }))

      this.setState({
        chapters: parsedData,
        chapter: data[0].id
      })
    })
  }

  fetchSubjects = () => {
    fetch(apis.LIST_SUBJECTS).then(
      async res => {
        const data = await res.json()
        const parsedData = data.map(item => ({
          value: item.id,
          label: item.Name
        }))

        this.setState({
          subjects: parsedData,
          subject: data[0].id
        })
      },
      () => {
        this.fetchGrades(data[0].id)
      }
    )
  }

  fetchGrades = id => {
    const subject = id || this.state.subject

    fetch(`${apis.LIST_GRADES}?subject=${subject}`).then(async res => {
      const data = await res.json()
      const parsedData = data.map(item => ({
        value: item.id,
        label: item.name
      }))

      this.setState(
        {
          grades: parsedData,
          grade: data[0].id
        },
        () => {
          this.fetchParts(data[0].id)
        }
      )
    })
  }

  fetchParts = id => {
    const grade = id || this.state.grade

    fetch(`${apis.LIST_PARTS}?grade=${grade}`).then(async res => {
      const data = await res.json()
      const parsedData = data.map(item => ({
        value: item.id,
        label: item.name
      }))

      this.setState(
        {
          parts: parsedData,
          part: data[0].id
        },
        () => {
          this.fetchChapters(data[0].id)
        }
      )
    })
  }

  _handleChangeSubject = e => {
    const subject = e.target.value

    this.setState(
      {
        subject,
        grades: null,
        grade: null,
        parts: null,
        part: null,
        chapters: null,
        chapter: null
      },
      this.fetchGrades
    )
  }

  _handleChangeGrade = e => {
    const grade = e.target.value

    this.setState(
      {
        grade,
        parts: null,
        part: null,
        chapters: null,
        chapter: null
      },
      this.fetchParts
    )
  }

  _handleChangePart = e => {
    const part = e.target.value

    this.setState(
      {
        part,
        chapters: null,
        chapter: null
      },
      this.fetchChapters
    )
  }

  _handleChangeChapter = e => {
    const chapter = e.target.value

    this.setState({
      chapter
    })
  }

  _handleSaveExercise = () => {
    const { subject, grade, part, chapter } = this.state
    const result = {
      type: "chapter",
      subject,
      grade,
      part,
      chapter,
      ...this.exercise,
      exerciseQuestions: this.exercise.questions
    }

    fetch(apis.CREATE_EXERCISE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    }).then(res => {
      console.log("res", res)
    })
  }

  _handleChangeExercise = exercise => {
    this.exercise = exercise
  }

  render() {
    const {
      subject,
      subjects,
      grade,
      grades,
      chapters,
      chapter,
      part,
      parts
    } = this.state

    return (
      <div>
        <Helmet title="Chapter Exercises Page" />
        <div>
          <div className={`container-fluid ${styles.containerFluid}`}>
            <div className="row" style={{ marginBottom: 30 }}>
              <div className="col-lg-7">
                <h1>Add Chapter Exercise</h1>
              </div>
              <div className="col-lg-2 justify-content-end" />
              <div className="col-lg-3 justify-content">
                <div className={styles.buttonWrapper}>
                  <button
                    className={styles.saveBtn}
                    onClick={this._handleSaveExercise}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className={styles.sectionContainer}>
                  <div className={styles.contentContainer}>
                    <div className="row">
                      {!!subjects && (
                        <Dropdown
                          label="Subject"
                          name="subject"
                          options={subjects}
                          onChange={this._handleChangeSubject}
                          value={subject}
                        />
                      )}
                      {!!grades && (
                        <Dropdown
                          label="Grade"
                          name="grade"
                          options={grades}
                          onChange={this._handleChangeGrade}
                          value={grade}
                        />
                      )}
                      {!!parts && (
                        <Dropdown
                          label="Part"
                          name="part"
                          options={parts}
                          onChange={this._handleChangePart}
                          value={part}
                        />
                      )}
                      {!!chapters && (
                        <Dropdown
                          label="Chapter"
                          name="chapter"
                          options={chapters}
                          onChange={this._handleChangeChapter}
                          value={part}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {chapter && (
              <ExerciseContent onChange={this._handleChangeExercise} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ChapterExercisePage
