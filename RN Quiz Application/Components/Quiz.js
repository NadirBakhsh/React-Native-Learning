import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class QuizScreen extends React.Component {

  state = {
    counter: 0,
    score: 0,
    showNext: true,
    quiz: false,
    startQuiz: true,
    scoreView: false,

  }

  async componentDidMount() {
    try {
      await fetch('https://opentdb.com/api.php?amount=10')
        .then(response => response.json())
        .then(json => {
          this.setState({
            quizArr: json.results
          })
        })
    } catch (e) { console.log(e) }

  }

  answerChecked(comingAnswer) {
    const { rightAnswer, score, counter, quizArr, } = this.state;
    if (counter < quizArr.length) {
      if (comingAnswer === rightAnswer) {
        this.setState({ score: score + 10 })
        console.log(score, "uuuuuuuuu")
      }
      this.nextq()
    } else {
      this.setState({ scoreView: true, })
      this.restquiz()
    }

  }


  restquiz() {
    this.setState({
      startQuiz: true,
      quiz: false,
    })
  }

  async nextq() {
    const { quizArr, counter } = this.state;
    // console.log(quizArr[counter].correct_answer,"nadiiasidaisd")
    // console.log(quizArr[counter].incorrect_answers,"nadiiasidaisd")
    if (counter < quizArr.length) {
      this.setState({
        question: quizArr[counter].question,
        rightAnswer: quizArr[counter].correct_answer,
        incorrectAnswers1: quizArr[0].incorrect_answers,
        incorrectAnswers2: quizArr[1].incorrect_answers,
        incorrectAnswers3: quizArr[2].incorrect_answers,
        counter: counter + 1,
      })

    } else {
      alert("Finish")
    }
  }

  quizStart() {
    this.setState({ quiz: true, scoreView: false, startQuiz: false, counter: 0, score: 0 })
  }


  render() {
    const { question, quiz, startQuiz, score, scoreView,
      counter,
      incorrectAnswers1,
      incorrectAnswers2,
      incorrectAnswers3, rightAnswer } = this.state;

    return (
      <View style={styles.container}>
        {scoreView && <View>
          <Text>Your score is {score}%</Text>
        </View>}

        {quiz && <View>
          <View style={{ marginTop: 10, }} >
            <Text>Q.No.{counter} : {question}</Text>
          </View>

          <View style={{ backgroundColor: 'blue', width: 300, height: 40, marginTop: 10, }}>
            <TouchableOpacity
              onPress={() => {
                this.answerChecked(rightAnswer)
              }}
            >
              <Text style={{ color: 'white' }}>Option 1 :  {rightAnswer}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: 'blue', width: 300, height: 40, marginTop: 10, }}>
            <TouchableOpacity
              onPress={() => {
                this.answerChecked(incorrectAnswers1)
              }}
            >
              <Text style={{ color: 'white', width: 300, height: 40, marginTop: 10, }}>Option 2 :  {incorrectAnswers1}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: 'blue', width: 300, height: 40, marginTop: 10, }}>
            <TouchableOpacity
              onPress={() => {
                this.answerChecked(incorrectAnswers2)
              }}
            >
              <Text style={{ color: 'white' }}>Option 3 :  {incorrectAnswers2}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: 'blue', width: 300, height: 40, marginTop: 10, }}>
            <TouchableOpacity
              onPress={() => {
                this.answerChecked(incorrectAnswers3)
              }}
            >
              <Text style={{ color: 'white', width: 300, height: 30, }}>Option 4 :  {incorrectAnswers3}</Text>
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 10, }}>
            <Button style={{ marginTop: 20 }}
              title="Next"
              onPress={() => { this.nextq() }}
            />
          </View>
        </View>}

        {startQuiz &&
          <View>
            <Button
              title="Start Quiz"
              onPress={() => { this.quizStart() }}
            />
          </View>}

      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
