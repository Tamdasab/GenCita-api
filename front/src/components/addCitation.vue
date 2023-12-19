<template>
    <div class="create-citation">
        <h3>CREATE YOUR CITATION</h3>

        <div id="new-citation-form">
            <input 
                type="text"
                name="text"
                maxlength="600"
                id="text"
                v-model="input_text"
                placeholder="make your inspitation" 
            />

            <div class="options">
                <div>
                    <input 
                    type="text" 
                    name="category" 
                    id="category"
                    v-model="input_category"
                    placeholder="Enter a category of citation"
                    />
                </div>

            </div>
            <button @click="addCitation" :aria-label="buttonText">
                new citation
            </button>
        </div>
    </div>
</template>




<script setup lang="ts">

import { ref,computed, type Ref } from "vue";

    interface Citation {
        text: string;
        category: string | null;
    }

    const citations: Ref<Citation[]> = ref([]);
    const input_text = ref('');
    const input_category = ref('');
    const buttonText = computed(() => {
        return `Add a new citation`;
    });
        
    const addCitation = async () => {
        try{
            
            const newCitation: Citation = {
                text: input_text.value,
                category: input_category.value,
            };

            console.log("logs", newCitation);

            const result = await fetch('http://localhost:3000/api/citation/add-citation', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        text: input_text.value,
                        category: input_category.value,
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("result", result);
            if (result.ok) {
                citations.value.push(newCitation);
                console.log("citation added", newCitation);
                const errorText = await result.text();
                console.error('failed to add citation', errorText);
            }else{
                console.error('failed to add citation', await result.text());
            }
        }catch(error){
            console.error('error adding citation:', error);
        }
    }
    
</script>
