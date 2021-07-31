import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createInvite } from '../../store/guilds';
import { closedModal } from '../../store/ui';

const CreateInvite: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { register, setValue } = useForm();
  const { activeGuild, activeInvite, openModal } = useSelector((s: Store.AppStore) => s.ui);

  useEffect(() => {
    if (openModal !== CreateInvite.name) return;

    dispatch(createInvite(activeGuild!.id));
    setValue('inviteCode', activeInvite?.id);
  }, []);

  const style: any = {
    overlay: {
      position: 'fixed',
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
  };

  if (!activeGuild || !activeInvite) return null;
  
  return (
    <ReactModal
      style={style}
      className="overflow-auto absolute bg-bg-tertiary w-1/3 inset-x-1/3 inset-y-3/4 p-5 rounded-lg outline-none"
      appElement={document.querySelector('#root')!}
      isOpen={openModal === CreateInvite.name}
      onRequestClose={() => dispatch(closedModal())}>
      <header className="mb-5">
        <h1 className="font-bold inline uppercase">Invite Friends to {activeGuild.name}</h1>
      </header>

      <div className="mt-10" />
      <h4 className="text-xs uppercase font-bold muted">Or Send A Server Invite To A Friend</h4>

      <form>
        <label
          htmlFor="inviteCode"
          className="uppercase">Invite Code</label>
        <div className="relative">
          <button className="background bg-primary heading px-3 h-8 rounded-sm top-1 right-1 absolute">Copy</button>
          <input
            id="inviteCode"
            type="text"
            {...register('inviteCode')}
            className="block w-full h-10 p-2 bg-bg-secondary rounded focus:outline-none" />

        </div>
      </form>
    </ReactModal>
  );
}
 
export default CreateInvite;