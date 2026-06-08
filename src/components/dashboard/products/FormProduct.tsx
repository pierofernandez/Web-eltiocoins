import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    ProductFormValues,
    productSchema,
} from '../../../lib/validators';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionFormProduct } from './SectionFormProduct';
import { InputForm } from './InputForm';
import { SelectForm } from './SelectForm';
import { FeaturesInput } from './FeaturesInput';
import { useEffect } from 'react';
import { generateSlug } from '../../../helpers';
import { VariantsInput } from './VariantsInput';
import { UploaderImages } from './UploaderImages';
import { Editor } from './Editor';
import {
    useCreateProduct,
    useProductById,
    useUpdateProduct,
} from '../../../hooks';
import { Loader } from '../../shared/Loader';
import { JSONContent } from '@tiptap/react';


interface Props {
    titleForm: string;
}

export const FormProduct = ({ titleForm }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
    });

    const { id } = useParams<{ id: string }>();

    const { product, isLoading } = useProductById(id || '');
    const { mutate: createProduct, isPending } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdatePending } =
        useUpdateProduct(product?.id || '');

    const navigate = useNavigate();


    useEffect(() => {
        if (product && !isLoading) {
            reset({
                name: product.name,
                slug: product.slug,
                category: product.category,
                platform: product.platform,
                features: (product.features || []).map((f: string) => ({ value: f })),
                description: product.description as JSONContent,
                images: product.images || [],
                variants: (product.variants || []).map(v => ({
                    id: v.id,
                    stock: v.stock,
                    price: v.price,
                })),
            });
        }
    }, [product, isLoading, reset]);

    const onSubmit = handleSubmit(data => {
        const features = data.features.map(feature => feature.value);
        if (id) {
            updateProduct({
                name: data.name,
                category: data.category,
                platform: data.platform,
                slug: data.slug,
                variants: data.variants,
                images: data.images,
                description: data.description,
                features,
            });
        } else {
            createProduct({
                name: data.name,
                category: data.category,
                platform: data.platform,
                slug: data.slug,
                variants: data.variants,
                images: data.images,
                description: data.description,
                features,
            });
        }
    });

    const watchName = watch('name');

    useEffect(() => {
        if (!watchName || id) return;

        const generatedSlug = generateSlug(watchName);
        setValue('slug', generatedSlug, { shouldValidate: true });
    }, [watchName, setValue, id]);

    if (isPending || isUpdatePending || isLoading) return <Loader />;

    return (
        <div className='flex flex-col gap-6 relative '>
            <div className='flex items-center justify-between text-black dark:text-stone-100'>
                <div className='flex items-center gap-3'>
                    <button
                        className='rounded-md border border-slate-200 bg-white p-1.5 shadow-sm transition-all group hover:scale-105 dark:border-stone-600 dark:bg-stone-800'
                        onClick={() => navigate(-1)}
                    >
                        <IoIosArrowBack
                            size={18}
                            className='transition-all group-hover:scale-125'
                        />
                    </button>
                    <h2 className='font-bold tracking-tight text-2xl capitalize'>
                        {titleForm}
                    </h2>
                </div>
            </div>

            <form
                className='grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1'
                onSubmit={onSubmit}
            >
                <SectionFormProduct
                    titleSection='Detalles del Producto'
                    className='lg:col-span-2 lg:row-span-2'
                >
                    <InputForm
                        type='text'
                        placeholder='Ejemplo: 100k monedas'
                        label='nombre'
                        name='name'
                        register={register}
                        errors={errors}
                        required
                    />
                    <FeaturesInput control={control} errors={errors} />
                </SectionFormProduct>

                <SectionFormProduct>
                    <InputForm
                        type='text'
                        label='Slug'
                        name='slug'
                        placeholder='Division elite + wins - pc'
                        register={register}
                        errors={errors}
                    />

                    <SelectForm
                        label='platform'
                        name='platform'
                        register={register}
                        errors={errors}
                        required
                        options={[
                            { label: 'PC', value: 'PC' },
                            { label: 'PS', value: 'PS' },
                            { label: 'XBOX', value: 'XBOX' },
                            { label: 'ALL', value: 'ALL' },
                        ]}
                    />

                    <SelectForm
                        label='category'
                        name='category'
                        register={register}
                        errors={errors}
                        required
                        options={[
                            { label: 'Monedas', value: 'monedas' },
                            { label: 'Division Rivals', value: 'divisionrivals' },
                            { label: 'Fut Champions', value: 'futchampions' },
                            { label: 'Objetivos', value: 'objetivos' },
                        ]}
                    />
                </SectionFormProduct>

                <SectionFormProduct
                    titleSection='Variantes del Producto'
                    className='lg:col-span-2 h-fit text-black dark:text-stone-100'
                >
                    <VariantsInput
                        control={control}
                        errors={errors}
                        register={register}
                    />
                </SectionFormProduct>

                <SectionFormProduct titleSection='Imágenes del producto'>
                    <UploaderImages
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />
                </SectionFormProduct>

                <SectionFormProduct
                    titleSection='Descripción del producto'
                    className='col-span-full'
                >
                    <Editor setValue={setValue} errors={errors} initialContent={product?.description as JSONContent} />
                </SectionFormProduct>

                <div className='flex gap-3 absolute top-0 right-0'>
                    <button
                        className='btn-secondary-outline'
                        type='button'
                        onClick={() => navigate(-1)}
                    >
                        Cancelar
                    </button>
                    <button className='btn-primary' type='submit'>
                        Guardar Producto
                    </button>
                </div>
            </form>
        </div>
    );
};