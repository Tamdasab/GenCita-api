<template>
    <div class="citation-list">
        <h3>CITATION LIST</h3>
        <div class="list" id="citation-list">
            <div v-if="citations">
                <div v-for="citation in citations" :key="citation.id" :class="`citation-item ${citation.done && 'done'}`">
                    <div class="citation-content">
                        <p>
                            {{ citation.content  }}
                        </p>
                    </div>

                    <div class="actions">
                        <button class="delete" @click="removeCitation(citation)">Delete</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No citations available</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, defineProps, type Ref } from "vue";

    interface Citation{
        content: string;
        category: string | null;
        createdAt: number;
        done: boolean;
        id: number;
    }

    const { citations: propCitations} = defineProps(['citations']);

    const citations: Ref<Citation[]> = ref(propCitations);

    

    const fetchCitations = async () => {
        try{
            const result = await fetch('http://localhost:3000/api/citation/all-citations');
            const data = await result.json();
            citations.value = data;
        } catch(error){
            console.error('error fetching citations:', error);
        }
    }

    onMounted(fetchCitations);

    const removeCitation = async (citation: Citation) => {
        try{
            const result = await fetch(`http://localhost:3000/api/citation/${citation.id}`, {
                method: 'DELETE',
            })

            if (result.ok) {
                citations.value = citations.value.filter((c: Citation) => c !== citation);
            } else{
                console.error('failed to remove citation');
            }

        } catch(error){
            console.error('error removing citation:', error);
        }
    }

</script>