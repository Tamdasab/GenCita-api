<template>
    <div class="citation-list">
        <h3>CITATION LIST</h3>
        <div class="list" id="citation-list">
            <div v-if="citations.length">
                <div v-for="citation in citations_asc" :key="citation.id" :class="`citation-item ${citation.done && 'done'}`">
                    <label>
                        <input type="checkbox" v-model="citation.done" />
                        <span :class="`Bubble ${citation.categoryClass}`"></span>
                    </label>

                    <div class="citation-content">
                        <input type="text" v-model="citation.content" />
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
    import { ref, computed, watch, type Ref } from "vue";

    interface Citation{
        content: string;
        category: string | null;
        categoryClass: string | null;
        createdAt: number;
        done: boolean;
        id: number;
    }

    const citations: Ref<Citation[]> = ref([]);

    const citations_asc = computed(() => citations.value.sort((a, b) => {
        return a.createdAt - b.createdAt;
    }))

    watch(citations, (updateVal: Citation[]) => {
        
    }, {
        deep: true
    })


    const removeCitation = async (citation: Citation) => {
        try{
            const result = await fetch(`http://localhost:3000/api/citation/${citation.id}`, {
                method: 'DELETE',
            })

            if (result.ok) {
                citations.value = citations.value.filter((c: Citation) => c !== citation)
            } else{
                console.error('failed to remove citation')
            }

        } catch(error){
            console.error('error removing citation:', error);
        }
    }

</script>