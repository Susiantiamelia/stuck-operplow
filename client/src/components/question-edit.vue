<template>
    <div class="edit">
        <v-container>
            <v-layout justify-center>
                <v-container>
                <v-flex>
                        <v-card flat>
                            <v-avatar
                            size="200px"
                            >
                            <i class="fas fa-paw fa-6x"></i>
                            </v-avatar>
                            <br><br>
                            <v-text-field
                                label="Regular"
                                v-model="question_title"
                            ></v-text-field>
                            <br><br>
                            <v-textarea
                                name="input-7-1"
                                label="Default style"
                                v-model="question_content"
                            ></v-textarea>
                            <v-btn outline color="black" @click="editQuestion(detail._id)">Edit</v-btn>
                        </v-card>
                </v-flex>
                </v-container>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout justify-center>
                <v-flex>
                    <v-card>
                        <v-card-title>
                            <h4>Answer:</h4>
                        </v-card-title>
                        <v-container v-for="(answer,index) in detail.answer" :key="index">
                            <v-layout id="answer-cont">
                                <v-flex xs12>
                                    <v-card flat>
                                        <v-card-title>
                                            <h4>{{ answer.username }}</h4>
                                            
                                        </v-card-title>
                                        <p id="answer">{{ answer.content}}</p>
                                    </v-card>
                                    
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>
